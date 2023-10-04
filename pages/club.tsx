import { columns } from "@/components/club/columns";
import { DataTable } from "@/components/club/data-table";
import Container from "@/components/common/container";
import MainLayout from "@/components/common/main-layout";
import { GetStaticProps, Metadata } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function ActivitiesPage() {
  return (
    <MainLayout>
      <Container fullWidth title="Club">
        <DataTable columns={columns} />
      </Container>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en")),
  },
});
