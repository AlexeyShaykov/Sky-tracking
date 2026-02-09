const SubHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-foreground italic  font-semibold mb-6 opacity-70">
      {children}
    </div>
  );
};

export default SubHeading;