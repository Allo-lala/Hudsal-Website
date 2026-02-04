"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  // Left column FAQs
  {
    id: 1,
    question: "What services does Hudsal Senior Care provide?",
    answer: "We provide comprehensive healthcare services including personal care, assisted living, medical support, medication management, and 24/7 nursing care for seniors in a comfortable home environment."
  },
  {
    id: 2,
    question: "How do I know if my loved one needs senior care?",
    answer: "Signs include difficulty with daily activities, medication management issues, frequent falls, social isolation, or declining personal hygiene. Our team can provide a free assessment to determine the right level of care."
  },
  {
    id: 3,
    question: "What qualifications do your caregivers have?",
    answer: "All our caregivers are licensed, certified, and undergo extensive background checks. Our team includes registered nurses, certified nursing assistants, and trained personal care specialists with years of experience."
  },
  {
    id: 4,
    question: "Can family members visit anytime?",
    answer: "Yes, we encourage family involvement and visits. We have flexible visiting hours and can accommodate special requests. Family members are always welcome to participate in care planning and activities."
  },
  {
    id: 5,
    question: "Do you accept insurance or Medicare?",
    answer: "We work with various insurance providers and can help navigate Medicare benefits. Our billing team will work with you to understand coverage options and create a payment plan that works for your family."
  }
];

const faqDataRight = [
  // Right column FAQs
  {
    id: 6,
    question: "What is the difference between your care packages?",
    answer: "Our packages range from basic personal care to comprehensive medical support. Gold On Demand offers 24/7 care, while other packages provide scheduled visits and specific services based on individual needs."
  },
  {
    id: 7,
    question: "How quickly can care services begin?",
    answer: "We can typically begin services within 24-48 hours of assessment, depending on the level of care needed. Emergency placements can often be accommodated the same day."
  },
  {
    id: 8,
    question: "Are your facilities CQC registered?",
    answer: "Yes, all our facilities are fully registered and regularly inspected by the Care Quality Commission (CQC). We maintain the highest standards of care and safety as required by UK regulations."
  },
  {
    id: 9,
    question: "What happens if my loved one's care needs change?",
    answer: "We regularly assess and adjust care plans as needs evolve. Our flexible approach means we can increase or modify services without disrupting the comfort and familiarity your loved one has established."
  },
  {
    id: 10,
    question: "Do you provide specialized care for dementia patients?",
    answer: "Yes, we have specialized training and programs for dementia and Alzheimer's care. Our staff is trained in memory care techniques and we provide a safe, structured environment designed for cognitive support."
  }
];

interface FAQItemProps {
  faq: {
    id: number;
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 pt-2 border-t border-border bg-secondary/20">
          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* <Sparkles className="w-5 h-5 text-emerald" /> */}
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about our Healthcare services and how we can help you
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {faqData.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openItems.includes(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faqDataRight.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openItems.includes(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}