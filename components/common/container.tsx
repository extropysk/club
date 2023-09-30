interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className="flex justify-center p-6">
      <div className="space-y-6 max-w-lg">{children}</div>
    </div>
  );
};

export default Container;
