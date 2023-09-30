import { MainNav } from "@/components/header/main-nav";
import { UserNav } from "@/components/header/user-nav";
import { ROUTES } from "constants/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const { push } = useRouter();

  useEffect(() => {
    if (session === null) {
      push(ROUTES.auth);
    }
  }, [session, push]);

  if (loading || !session) {
    return null;
  }

  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6 hidden md:flex" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
