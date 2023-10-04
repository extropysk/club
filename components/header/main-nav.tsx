import { ROUTES } from "constants/routes";
import Link from "next/link";
import { cn } from "utils/ui";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={ROUTES.home}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href={ROUTES.profile}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Profile
      </Link>
    </nav>
  );
}
