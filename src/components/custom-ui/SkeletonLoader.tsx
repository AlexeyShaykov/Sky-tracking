import type { CSSProperties } from 'react';

import { cn } from '@/utils/cn';

const SkeletonLoader = ({
  count,
  style,
  className,
}: {
  count?: number;
  style?: CSSProperties;
  className?: string;
}) => {

  return (
    <>
      {
        Array.from({ length: count ?? 1 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'animate-pulse rounded-lg bg-neutral-900  mb-[0.65rem] h-10 last:mb-0',
              className,
            )}
            style={style}
          />
        ))
      }
    </>
  )
};

export default SkeletonLoader;
