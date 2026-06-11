import PolicyPageLayout from "@/components/policy/PolicyPageLayout";
import PolicyContent from "@/components/policy/PolicyContent";
import { termsAndConditionsContent } from "@/content/policies";

export default function TermsAndConditionsPage() {
  return (
    <PolicyPageLayout title={termsAndConditionsContent.pageTitle}>
      <PolicyContent content={termsAndConditionsContent} />
    </PolicyPageLayout>
  );
}
