import { useEffect } from 'react';
import { Input } from '@/components/input';
import { Field, Fieldset, Label, Legend } from '@headlessui/react';
import { Button } from '@/components/button';
import { useAuth } from '@/hooks/useAuth/useAuth';
import { useForm } from '@/hooks/useForm/useForm';
import { FieldHint } from '@/components/field';
import { LoginForm, LoginFormData } from './loginPage.models';
import { suite } from './validator';

export const LoginPage = () => {
    const { register, login, logout } = useAuth();
    const form = useForm<LoginFormData>({
        initialState: {
            [LoginForm.account]: '',
            [LoginForm.password]: '',
        },
        suite: suite,
    });

    useEffect(() => {
        console.log(form.validation?.errors);
    }, [form.validation]);

    useEffect(() => {
        console.log(form.isSubmitted);
    }, [form.isSubmitted]);

    return (
        <div className="flex flex-col items-center h-full justify-center">
            <div className="w-full max-w-lg px-4">
                <Fieldset className="space-y-6 rounded-xl bg-white/30 p-6 sm:p-10">
                    <Legend className="text-lg font-semibold text-gray-800">
                        Log In
                    </Legend>
                    <Field>
                        <Label className="text-sm/6 font-medium text-gray-800">
                            Account:
                        </Label>
                        <Input
                            value={form.value[LoginForm.account]}
                            onChange={(e) =>
                                form.setValue(LoginForm.account, e.target.value)
                            }
                        />
                        <FieldHint
                            isVisible={form.isSubmitted}
                            message={form.validation?.getError(
                                LoginForm.account,
                            )}
                        />
                    </Field>
                    <Field>
                        <Label className="text-sm/6 font-medium text-gray-800">
                            Password:
                        </Label>
                        <Input
                            value={form.value[LoginForm.password]}
                            onChange={(e) =>
                                form.setValue(
                                    LoginForm.password,
                                    e.target.value,
                                )
                            }
                        />
                        <FieldHint
                            isVisible={form.isSubmitted}
                            message={form.validation?.getError(
                                LoginForm.password,
                            )}
                        />
                    </Field>
                </Fieldset>
                <Button className="mt-4 w-full" onClick={() => form.submit()}>
                    Submit
                </Button>
            </div>
        </div>
    );
};
