import { cloneElement, ReactNode, useCallback } from 'react';
import { useDialogStore } from './useDialogStore';
import { Dialog } from '@headlessui/react';

export const useDialog = (key: string, element: ReactNode) => {
    const {
        openDialog,
        closeDialog,
        closeAllDialogs,
        isKeyExist,
        isDialogOpen,
    } = useDialogStore((state) => state);

    const close = useCallback(() => {
        if (isKeyExist(key))
            throw new Error(`dialog key: ${key} is duplicate.`);
        return closeDialog(key);
    }, [closeDialog, isKeyExist, key]);

    const open = () => {
        // const clonedElement = cloneElement(
        //     <Dialog key={key} open={true} onClose={close}>
        //         {element}
        //     </Dialog>,
        // );
        if (isKeyExist(key))
            throw new Error(`dialog key: ${key} is duplicate.`);
        openDialog(key, element);
    };
    const closeAll = () => closeAllDialogs();

    return {
        isOpen: isDialogOpen(key),
        open,
        close,
        closeAll,
    };
};
