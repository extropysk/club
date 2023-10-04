import Container from "@/components/common/container";
import MainLayout from "@/components/common/main-layout";
import { ProfileForm } from "@/components/forms/profile-form";

export default function SettingsProfilePage() {
  return (
    <MainLayout>
      <Container
        title="Profile"
        description="This is how others will see you on the site."
      >
        <ProfileForm />
      </Container>
    </MainLayout>
  );
}
