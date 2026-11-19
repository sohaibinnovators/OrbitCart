export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "orders",
    title: "Orders & Shopping",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Add a product to your bag, open the cart, and continue to checkout. Fill in the demo customer and shipping fields, choose a delivery and payment option, then submit. The order is simulated in your browser.",
      },
      {
        question: "Can I change an order after submitting it?",
        answer:
          "Not in this demo. Once you submit, the sample order is stored only in this browser session and cannot be edited. Refreshing or closing the tab can clear it.",
      },
      {
        question: "How can I find a product?",
        answer:
          "Use search in the header, browse Shop, or open a collection. Search looks through product names, categories, descriptions, and tags in the local catalog.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    items: [
      {
        question: "What delivery options are available?",
        answer:
          "Checkout shows two illustrative options: Standard Delivery and Express Delivery. They change the sample shipping amount. They are not connected to a carrier.",
      },
      {
        question: "Where can I find shipping information?",
        answer:
          "Open Shipping & Returns for the demo timelines, or read the shipping note on a product page. Every timeline on this site is an example, not a delivery promise.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns",
    items: [
      {
        question: "What is the return policy?",
        answer:
          "The returns story is an illustrative demo policy: a sample 30-day window and a fictional refund path. Nothing is actually shipped, so nothing can be returned.",
      },
      {
        question: "How can I request help with an order?",
        answer:
          "Use the contact form. It confirms on the page only and does not send an email. There is no support inbox behind this demo.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    items: [
      {
        question: "Which payment methods does this demo support?",
        answer:
          "Cash on Delivery — Demo, and Test Payment — Simulated. Neither collects card numbers or charges money.",
      },
      {
        question: "Is the checkout real or simulated?",
        answer:
          "Simulated. OrbitCart does not process payments, create shipments, or store orders on a server. A successful checkout only saves a sample summary in this browser.",
      },
    ],
  },
];

export const previewFaqs = faqGroups.flatMap((group) => group.items).slice(0, 5);
