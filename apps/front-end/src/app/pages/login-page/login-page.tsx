import clsx from 'clsx';
import { Input } from '@/components/input';
import { Description, Field, Fieldset, Label, Legend } from '@headlessui/react';
import { Button } from '@/components/button';

export const LoginPage = () => {
  const sendError = () => {
    throw new Error('This is an error');
  };

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
            <Input />
          </Field>
          <Field>
            <Label className="text-sm/6 font-medium text-gray-800">
              Password:
            </Label>
            <Input />
          </Field>
          <Button onClick={sendError}>Send Error</Button>
        </Fieldset>
      </div>
    </div>
  );
};
