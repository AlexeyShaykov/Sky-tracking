import ProgressBar from '../custom-ui/ProgressBar';

const FlightStatus = ({
	progress
}: {
	progress: number
}) => {
  return (
    <div className="bg-card p-element mb-1 flex flex-col gap-4">
			 <ProgressBar progress={progress} />

			<div className="flex justify-between text-sm opacity-50">
				<div>
					<span>2 715 km</span>
					<span className="mx-2">•</span>
					<span>3h 1m</span>
				</div>
				<div>
					<span>882 km</span>
					<span className="mx-2">•</span>
					<span>59 min</span>
				</div>
			</div>
		</div>
  )
};

export default FlightStatus;