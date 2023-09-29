import { AppearanceForm } from "@/components/appearance/appearance-form";
import MainLayout from "@/components/common/main-layout";
import { Separator } from "@/components/ui/separator";

export default function SettingsAppearancePage() {
  return (
    <MainLayout>
      <div className=" flex justify-center p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Appearance</h3>
            <p className="text-sm text-muted-foreground">
              Customize the appearance of the app. Automatically switch between
              day and night themes.
            </p>
          </div>
          <Separator />
          <AppearanceForm />
        </div>
      </div>
    </MainLayout>
  );
}
