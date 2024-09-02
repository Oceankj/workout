import type { Suite as VestSuite } from 'vest';

export type IsTouchedObject<Key extends string | number | symbol = string> = {
    [key in Key]: boolean;
};

export type FormData = Record<string, unknown>;

export type Suite = VestSuite<
    string,
    string,
    (...args: unknown[]) => unknown[]
>;

export interface UseFormProps<FormDataType, SuiteType> {
    initialState: FormDataType;
    suite: SuiteType;
    onSubmit?: (data: FormDataType) => void;
}
