import PrivacyPolicy from "@/components/terms&conditions/PrivacyPolicy";
import Terms from "@/components/terms&conditions/Terms";
import RefundPolicy from "@/components/terms&conditions/RefundPolicy";

export default function TermsPolicy() {
  return (
    <>
      <div>Terms and Policy - Conditions</div>
      <PrivacyPolicy />
      <Terms />
      <RefundPolicy />
    </>
  );
}
