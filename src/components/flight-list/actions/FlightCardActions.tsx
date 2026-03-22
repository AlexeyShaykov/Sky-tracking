import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

import { Button } from '@/components/animate-ui/components/buttons/button';
import { Heart } from '@/components/animate-ui/icons/heart';

import { addFavorite, removeFavorite } from '@/store/favorites/favorites.slice';

const FlightCardActions = ({ flightId }: { flightId: string }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const isFavorite = favorites.includes(flightId);

  const onToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(flightId));
    } else {
      dispatch(addFavorite(flightId));
    }
  };

  return (
    <div
      className={
				'xs:h-auto xs:w-full xs:origin-bottom-right xs:right-0 xs:top-1 xs:justify-end xs:flex-row xs:group-hover:right-auto xs:group-hover:-top-10 xs:px-1 absolute top-0.5 right-2 z-50 flex h-full w-10 origin-top-right scale-0 flex-col gap-2 px-3 opacity-0 transition-all duration-500 group-hover:right-3 group-hover:scale-100 group-hover:opacity-100'
			}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onToggleFavorite}
      >
        <Heart
          fill={isFavorite ? 'var(--foreground)' : 'none'}
          className="size-5"
          animateOnHover
        />
      </Button>
    </div>
  );
};

export default FlightCardActions;
