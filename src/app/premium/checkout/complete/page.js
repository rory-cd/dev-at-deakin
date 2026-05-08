import PageHeading from "@/components/PageHeading";
import CheckoutCompleteContent from "@/components/CheckoutCompleteContent";

export default async function CheckoutCompletePage({ searchParams }) {

  const sessionId = await searchParams.sessionId;

  return (
    <div className="container-center">
      <PageHeading title={"Checkout"} />
        <CheckoutCompleteContent sessionId={sessionId} />
    </div>
  );
}