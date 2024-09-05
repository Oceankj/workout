import clsx from 'clsx';

interface FieldHintProps {
    isVisible: boolean;
    message?: string;
}

export const FieldHint = ({ isVisible, message }: FieldHintProps) => {
    return (
        <p
            className={clsx('text-red-500 ease-in-out duration-100 h-5', {
                visible: isVisible,
                invisible: !isVisible,
            })}>
            {message}
        </p>
    );
};
