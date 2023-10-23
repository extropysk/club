import Container from "@/components/common/container";
import MainLayout from "@/components/common/main-layout";
import { columns } from "@/components/users/columns";
import { DataTable } from "@/components/users/data-table";
import { GetStaticProps, Metadata } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const metadata: Metadata = {
  title: "Users",
};

export default function ActivitiesPage() {
  return (
    <MainLayout>
      <Container fullWidth title="Users">
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
