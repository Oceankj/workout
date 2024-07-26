import clsx from 'clsx';
import type { InputProps as HLInputProps } from '@headlessui/react';
import { Input as HLInput } from '@headlessui/react';

export type InputProps = HLInputProps;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <HLInput
      className={clsx(
        'mt-3 block w-full rounded-lg border-none bg-white/40 py-1.5 px-3 text-sm/6 text-gray-800',
        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-indigo-600/25',
        className
      )}
      {...props}
    />
  );
};
