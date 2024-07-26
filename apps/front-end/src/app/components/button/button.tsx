import './button.css';
import type { ButtonProps as HLButtonProps } from '@headlessui/react';
import { Button as HLButton } from '@headlessui/react';
import clsx from 'clsx';

export interface ButtonProps extends HLButtonProps {
  layout?: 'primary' | 'secondary';
}
export const Button = ({
  layout = 'primary',
  className,
  ...props
}: ButtonProps) => (
  <HLButton
    className={clsx(
      'btn w-60 h-16 rounded-xl flex items-center justify-center cursor-pointer col-start-1 col-end-2',
      layout === 'primary' &&
        'btn__primary shadow-lg bg-[#6d5dfc] text-gray-100 row-start-4 row-end-5 hover:text-white',
      layout === 'secondary' &&
        'btn__secondary bg-gray-100 text-gray-700  row-start-5 row-end-6 hover:text-[#6d5dfc]'
    )}
    {...props}
  />
);
