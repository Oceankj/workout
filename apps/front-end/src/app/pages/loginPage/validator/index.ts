import { create, enforce, test } from 'vest';
import { LoginForm, LoginFormData } from '../loginPage.models';

export const suite = create((data: LoginFormData) => {
    test(LoginForm.account, 'Account is required', () => {
        enforce(data[LoginForm.account]).isNotBlank();
    });

    test(LoginForm.password, 'Password is required', () => {
        enforce(data[LoginForm.password]).isNotBlank();
    });
});
