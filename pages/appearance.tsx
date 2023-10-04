import Container from "@/components/common/container";
import MainLayout from "@/components/common/main-layout";
import { AppearanceForm } from "@/components/forms/appearance-form";

export default function SettingsAppearancePage() {
  return (
    <MainLayout>
      <Container
        title="Appearance"
        description="Customize the appearance of the app. Automatically switch between day and night themes."
      >
        <AppearanceForm />
      </Container>
    </MainLayout>
  );
}
