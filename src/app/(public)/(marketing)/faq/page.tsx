import FAQContent from "@/components/public/faq-content";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "FAQ | LifeDrop",
  description: "Frequently asked questions about LifeDrop.",
};

const faqs = [
  {
    question: "Who can register as a donor?",
    answer:
      "People who meet the applicable blood donation eligibility requirements can register as donors. Final eligibility should always be confirmed according to appropriate medical guidance.",
  },
  {
    question: "How does donor matching work?",
    answer:
      "The platform uses information such as blood group and request details to identify potentially compatible donors.",
  },
  {
    question: "Can I create an emergency blood request?",
    answer:
      "Yes. A requester can create a blood request and provide the required patient, blood group, urgency, and location information.",
  },
  {
    question: "Will donors receive notifications?",
    answer:
      "Eligible matched donors can receive notifications about relevant blood requests and important status changes.",
  },
  {
    question: "Is my account protected?",
    answer:
      "The platform uses authenticated access and role-based permissions to protect account and dashboard functionality.",
  },
];

export default function FAQPage() {
  return <FAQContent faqs={faqs} />;
}