import { columns } from "@/components/activities/columns";
import { DataTable } from "@/components/activities/data-table";
import Container from "@/components/common/container";
import MainLayout from "@/components/common/main-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function ActivitiesPage() {
  return (
    <MainLayout>
      <Container fullWidth>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <DataTable columns={columns} />
      </Container>
    </MainLayout>
  );
}
