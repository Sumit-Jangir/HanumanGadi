import type { Metadata } from "next";
import PolicyPageLayout from "@/components/policy/PolicyPageLayout";
import PolicyContent from "@/components/policy/PolicyContent";
import { deleteAccountContent } from "@/content/policies";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "Request deletion of your Hanumangadi account and personal data. Steps, data removed, and retention details for Play Store compliance.",
};

export default function DeleteAccountPage() {
  return (
    <PolicyPageLayout title={deleteAccountContent.pageTitle}>
      <PolicyContent content={deleteAccountContent} />
    </PolicyPageLayout>
  );
}
