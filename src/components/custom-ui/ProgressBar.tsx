import { Plane } from 'lucide-react';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative">
      <div
        className="bg-blue-600 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      >
        <Plane fill='white' strokeWidth={0} className="rotate-45 absolute top-0" 
          style={{
            position: 'absolute',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;