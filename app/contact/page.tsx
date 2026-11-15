import type { Metadata } from "next";
import { ContactPageBody } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Aziz, message him on LinkedIn or download his CV.",
};

export default function ContactPage() {
  return <ContactPageBody />;
}
