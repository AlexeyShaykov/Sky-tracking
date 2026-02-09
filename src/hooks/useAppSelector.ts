import { useSelector, type TypedUseSelectorHook } from 'react-redux';

import type { TRootState } from '@/store';

const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;


export default useAppSelector;