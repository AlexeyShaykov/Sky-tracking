import { useDispatch } from 'react-redux';

import type { TAppDispatch } from '@/store';

const useAppDispatch: () => TAppDispatch = useDispatch<TAppDispatch>; 
 
export default useAppDispatch;