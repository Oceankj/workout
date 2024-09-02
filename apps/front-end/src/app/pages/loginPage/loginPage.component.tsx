import clsx from 'clsx';
import { Input } from '@/components/input';
import { Description, Field, Fieldset, Label, Legend } from '@headlessui/react';
import { Button } from '@/components/button';
import { useAuth } from '@/hooks/useAuth/useAuth';
import { useForm } from '@/hooks/useForm/useForm';
import { create } from 'vest';
import { LoginForm, LoginFormData } from './loginPage.models';
import { useEffect } from 'react';

export const LoginPage = () => {
    const { register, login, logout } = useAuth();
    const form = useForm<LoginFormData>({
        initialState: {
            [LoginForm.account]: '',
            [LoginForm.password]: '',
        },
        suite: create((data) => {
            if (!data[LoginForm.account]) {
                return ['Account is required'];
            }
            if (!data[LoginForm.password]) {
                return ['Password is required'];
            }
        }),
    });

    useEffect(() => {
        console.log(form.validation);
    }, [form.validation]);

    return (
        <div className="flex flex-col items-center">
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
                    </Field>
                </Fieldset>
            </div>
        </div>
    );
};
