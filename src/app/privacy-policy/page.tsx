import PolicyPageLayout from "@/components/policy/PolicyPageLayout";
import PolicyContent from "@/components/policy/PolicyContent";
import { privacyPolicyContent } from "@/content/policies";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageLayout title={privacyPolicyContent.pageTitle}>
      <PolicyContent content={privacyPolicyContent} />
    </PolicyPageLayout>
  );
}
