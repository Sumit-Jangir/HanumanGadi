import PolicyPageLayout from "@/components/policy/PolicyPageLayout";
import PolicyContent from "@/components/policy/PolicyContent";
import { returnRefundPolicyContent } from "@/content/policies";

export default function ReturnRefundPolicyPage() {
  return (
    <PolicyPageLayout title={returnRefundPolicyContent.pageTitle}>
      <PolicyContent content={returnRefundPolicyContent} />
    </PolicyPageLayout>
  );
}
