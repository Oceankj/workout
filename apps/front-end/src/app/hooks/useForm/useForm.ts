import { useState, useCallback, useTransition, useEffect } from 'react';
import {
    IsTouchedObject,
    Suite,
    UseFormProps,
    FormData,
} from './useForm.model';
import { useDebouncedCallback } from 'use-debounce';
import { SuiteRunResult } from 'vest';

export const useForm = <
    FormDataType extends FormData,
    SuiteType extends Suite = Suite,
>({
    initialState,
    suite,
    onSubmit,
    validateDelay = 300,
}: UseFormProps<FormDataType, SuiteType>) => {
    const initialIsTouchedObject = Object.keys(initialState).reduce(
        (acc, key) => {
            acc[key as keyof FormDataType] = false;
            return acc;
        },
        {} as IsTouchedObject<keyof FormDataType>,
    );

    const [formData, setFormData] = useState<FormDataType>(initialState);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isTouched, setIsTouched] = useState<
        IsTouchedObject<keyof FormDataType>
    >(initialIsTouchedObject);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [isVerifying, startTransition] = useTransition();

    const [validation, setValidation] =
        useState<SuiteRunResult<string, string>>();
    const debouncedSetValidate = useDebouncedCallback(
        (formData) => {
                console.log('result',suite(formData))
            return setValidation(suite(formData))},
        validateDelay,
    );
    useEffect(() => {
        debouncedSetValidate(formData);
    }, [debouncedSetValidate, formData]);

    const handleSetValue = useCallback(
        (
            field: keyof FormDataType,
            value: FormDataType[keyof FormDataType],
        ) => {
            startTransition(() => {
                setFormData({ ...formData, [field]: value });
            });
            setIsTouched((prevTouched) => ({
                ...prevTouched,
                [field]: true,
            }));
            setIsDirty(true);
        },
        [formData],
    );

    const handleReset = useCallback(() => {
        setFormData(initialState);
        setIsTouched(initialIsTouchedObject);
        setIsDirty(false);
        setIsSubmitted(false);
    }, [initialIsTouchedObject, initialState]);

    const handleSubmit = useCallback(() => {
        setIsSubmitted(true);
        setValidation(suite(formData))
        if (validation?.isValid()) {
            onSubmit?.(formData);
        }
    }, [suite, formData, validation, onSubmit]);

    return {
        isVerifying,
        isSubmitted,
        isTouched,
        isDirty,
        validation,
        value: formData,
        setValue: handleSetValue,
        submit: handleSubmit,
        reset: handleReset,
    };
};

export type { UseFormProps, Suite, FormData };
