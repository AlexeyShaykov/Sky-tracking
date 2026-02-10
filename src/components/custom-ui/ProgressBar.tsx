import { Plane } from 'lucide-react';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full dark:bg-neutral-800 rounded-full h-1 relative bg-neutral-200/50">
      <div
        className="bg-linear-to-r from-rose-500 to-orange-400 h-full rounded-full opacity-80 transition-all ease-in-out duration-500"
        style={{ width: `${progress}%` }}
      >
        <Plane
          fill="white"
          strokeWidth={0}
          className="rotate-45 absolute top-1/2 -right-1.5 -translate-y-1/2"
          style={{
            left: `calc(${progress}% - 0.5rem)`,
          }}
          size={26}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
