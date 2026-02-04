import { Header } from "@/components/header";
import { PageHeader } from "@/components/page-header";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about Hudsal Senior Care services, qualifications, insurance, and care packages.',
};

export default function FAQPage() {
  return (
    <main>
      <Header />
      <PageHeader
        badge="FAQs"
        title="Frequently Asked Questions"
        description="Find answers to common questions about our senior care services"
      />
      <FAQ />
      <Footer />
    </main>
  );
}