import { ReactNode, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDialogStore } from './useDialogStore';

export const useDialog = (DialogComponent: ReactNode, id: string) => {
    const { openDialog, closeDialog, closeAllDialogs } = useDialogStore(
        (state) => state,
    );
    const isOpen = useDialogStore((state) => state.dialogs[id]);
    const open = () => openDialog(id);
    const close = useCallback(() => closeDialog(id), [closeDialog, id]);

    const closeAll = () => closeAllDialogs();

    useEffect(() => {
        if (!isOpen) return;
        const el = document.createElement('div');
        document.body.appendChild(el);
        createPortal(DialogComponent, el);

        return () => {
            document.body.removeChild(el);
        };
    }, [isOpen, DialogComponent, close]);

    return {
        open,
        close,
        closeAll,
    };
};
