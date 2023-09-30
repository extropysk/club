import Container from "@/components/common/container";
import MainLayout from "@/components/common/main-layout";
import { ProfileForm } from "@/components/forms/profile-form";
import { Separator } from "@/components/ui/separator";

export default function SettingsProfilePage() {
  return (
    <MainLayout>
      <Container>
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </Container>
    </MainLayout>
  );
}
