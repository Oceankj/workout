import { useState, useCallback, useMemo, useTransition } from 'react';
import {
    IsTouchedObject,
    Suite,
    UseFormProps,
    FormData,
} from './useForm.model';

export const useForm = <
    FormDataType extends FormData,
    SuiteType extends Suite = Suite,
>({
    initialState,
    suite,
    onSubmit,
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

    const validation = useMemo(() => suite(formData), [formData, suite]);

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
        if (validation.isValid()) {
            onSubmit?.(formData);
            setIsSubmitted(true);
        }
    }, [validation, onSubmit, formData]);

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
