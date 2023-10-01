import { cn } from "utils/ui";

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
  title?: string;
  description?: string;
}

const Container = ({ children, fullWidth, title, description }: Props) => {
  return (
    <div className="flex justify-center p-6">
      <div className={cn("space-y-6", fullWidth ? "w-full" : "max-w-lg")}>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Container;
