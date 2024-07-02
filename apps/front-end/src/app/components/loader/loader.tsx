import clsx from 'clsx';

interface LoaderProps {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: LoaderProps) => {
  const waveClassName =
    'absolute opacity-50 w-20 h-20 rounded-full z-10 bg-gradient-to-br from-grey-light-2 to-white shadow-[0.4rem_0.4rem_0.8rem_#c8d0e7,-0.4rem_-0.4rem_0.8rem_#ffffff] z-20 blur-[2px] ';

  return (
    <div
      className={clsx(
        'w-36 h-36 col-span-1 row-span-2mx-auto rounded-lg grid place-items-center transition-transform duration-500',
        isLoading ? 'scale-100' : 'scale-0'
      )}
    >
      <span className={clsx(waveClassName, 'animate-loaderWaves')} />
      <span className={clsx(waveClassName, 'animate-loaderWavesDelay')} />
      <div className="w-14 h-14 z-30 rounded-[50%] align-middle loader-14 relative flex items-center justify-center">
        <div className="animate-loaderWavesDelay absolute h-5 w-5 rounded-full bg-primary" />
        <div className="animate-loaderWaves absolute h-5 w-5 rounded-full bg-primary-dark" />
      </div>
    </div>
  );
};
