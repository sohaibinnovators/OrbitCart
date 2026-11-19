import type { Metadata } from "next";
import { OrderSuccessClient } from "@/src/components/checkout/OrderSuccessClient";
import { Container } from "@/src/components/ui/Container";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "OrbitCart demo order confirmation. No real payment or shipment was processed.",
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <Container className="py-12">
      <OrderSuccessClient />
    </Container>
  );
}
