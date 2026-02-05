import { useDispatch } from '@reduxjs/toolkit';

import type { TAppDispatch } from '@/store';

const useAppDispatch: () => TAppDispatch = () => {
  return useDispatch<TAppDispatch>();
};
 
export default useAppDispatch;