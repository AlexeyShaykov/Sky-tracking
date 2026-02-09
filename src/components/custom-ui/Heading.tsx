import type { PropsWithChildren } from 'react';

const Heading = ({ children }: PropsWithChildren) => {
  return (
    <h1 className="text-2xl text-foreground font-bold mb-4">
      {children}
    </h1>
  );
};

export default Heading; 