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
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Container;
