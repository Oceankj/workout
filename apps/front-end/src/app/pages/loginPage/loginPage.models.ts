export enum LoginForm {
    account = 'account',
    password = 'password',
}

export interface LoginFormData extends Record<string, string | null> {
    [LoginForm.account]: string;
    [LoginForm.password]: string;
}
