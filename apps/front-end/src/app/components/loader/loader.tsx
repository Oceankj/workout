import clsx from 'clsx';
import { createPortal } from 'react-dom';

interface LoaderProps {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: LoaderProps) => {
  const waveClassName =
    'absolute opacity-5 w-20 h-20 rounded-full z-10 bg-gradient-to-br from-grey-light-2 to-white shadow-[0.4rem_0.4rem_0.8rem_#c8d0e7,-0.4rem_-0.4rem_0.8rem_#ffffff] z-20';

  return (
    <>
      {createPortal(
        <div
          className={clsx(
            'w-full h-screen flex items-center justify-center absolute top-0 backdrop-blur-sm',
            isLoading ? 'scale-100' : 'scale-0'
          )}
        >
          <div className="z-10 w-16 h-16 col-span-1 row-span-2 mx-auto rounded-lg grid place-items-center transition-transform duration-500">
            <span className={clsx(waveClassName, 'animate-loaderWaves')} />
            <span className={clsx(waveClassName, 'animate-loaderWavesDelay')} />
            <p className='z-30'>Loading</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
