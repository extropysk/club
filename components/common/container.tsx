import { cn } from "utils/ui";

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Container = ({ children, fullWidth }: Props) => {
  return (
    <div className="flex justify-center p-6">
      <div className={cn("space-y-6", fullWidth ? "w-full" : "max-w-lg")}>
        {children}
      </div>
    </div>
  );
};

export default Container;
