import { createPortal } from 'react-dom';
import { useDialogStore } from '@/hooks/useDialog/useDialogStore';
import { Dialog } from '@headlessui/react';
import { cloneElement, ReactElement, useEffect } from 'react';

export const DialogContainer = () => {
    const { dialogs, closeDialog, isKeyExist } = useDialogStore(
        (state) => state,
    );

    useEffect(() => {
        console.log(dialogs);
    }, [dialogs]);
    return (
        dialogs.length > 0 && (
            <>
                {createPortal(
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-md bg-black/30">
                        <div className="flex min-h-full items-center justify-center p-4"></div>
                    </div>,
                    document.body,
                )}
                {Object.entries(dialogs).map(([_index, [key, element]]) => {
                    console.log({
                        key,
                        element,
                    });
                    return (
                        <Dialog
                            key={key}
                            open={isKeyExist(key)}
                            onClose={() => closeDialog(key)}
                            className="relative z-50">
                            <div className="fixed inset-0 z-10 w-screen overflow-y-aut">
                                <div className="flex min-h-full items-center justify-center p-4">
                                    {cloneElement(element as ReactElement, {
                                        onClose: () => closeDialog(key),
                                    })}
                                </div>
                            </div>
                        </Dialog>
                    );
                })}
            </>
        )
    );
};
