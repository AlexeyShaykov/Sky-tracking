import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

import { Button } from '@/components/animate-ui/components/buttons/button';
import { Heart } from '@/components/animate-ui/icons/heart';

import { addFavorite, removeFavorite } from '@/store/favorites/favorites.slice';

const FlightCardActions = ({
  flightId,
}: {
  flightId: string;
}) => {
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
      className="absolute top-0.5 right-1 group-hover:-right-14 px-3 
      scale-0 group-hover:scale-100 h-full origin-top-right
      flex flex-col transition-all opacity-0 group-hover:opacity-100 duration-500"
    >
      <Button
        type='button'
        variant='ghost'
        size='icon'
        onClick={onToggleFavorite}
      >
        <Heart fill={isFavorite ? 'var(--foreground)' : 'none'} className="size-5" animateOnHover />
      </Button>
    </div>
  );
};

export default FlightCardActions; 