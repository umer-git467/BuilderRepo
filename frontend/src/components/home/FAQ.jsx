import { useState } from "react";

function FAQ() {
  const faqItems = [
    {
      id: "1",
      title: "I'm not exactly Will I be able to use BuildHub?",
      content: (
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Yes, BuildHub is designed to be user-friendly for all skill levels.
          Our intuitive interface and helpful guides make it easy for anyone to
          use our platform effectively.
        </p>
      ),
    },
    {
      id: "2",
      title: "Can BuildHub really help me save time and money?",
      content: (
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Absolutely! BuildHub streamlines your workflow, automates repetitive
          tasks, and provides cost-effective solutions, resulting in significant
          time and cost savings for your projects.
        </p>
      ),
    },
    {
      id: "3",
      title: "How can BuildHub help me grow my business?",
      content: (
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Absolutely! BuildHub streamlines your workflow, automates repetitive
          tasks, and provides cost-effective solutions, resulting in significant
          time and cost savings for your projects.
        </p>
      ),
    },
    {
      id: "4",
      title:
        "CaWhat if I have an existing relationship with suppliers/contractors? Can I still use BuildHub?",
      content: (
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Absolutely! BuildHub streamlines your workflow, automates repetitive
          tasks, and provides cost-effective solutions, resulting in significant
          time and cost savings for your projects.
        </p>
      ),
    },
    {
      id: "5",
      title: "How secure are the transactions made through BuildHub?",
      content: (
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Absolutely! BuildHub streamlines your workflow, automates repetitive
          tasks, and provides cost-effective solutions, resulting in significant
          time and cost savings for your projects.
        </p>
      ),
    },
    // Add more FAQ items here (up to 7-8 items)
  ];
  return (
    <div id="faqs">
      <h2 className="text-center text-4xl mt-16 font-bold py-8">
        Frequently Asked Questions
      </h2>
      <div className="flex justify-center py-20">
        <div className="w-1/2">
          <div id="accordion-collapse" data-accordion="collapse">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ id, title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h2 id={`accordion-collapse-heading-${id}`}>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={`accordion-collapse-body-${id}`}
        >
          <span>{title}</span>
          <svg
            className={`w-3 h-3 shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="https://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-collapse-body-${id}`}
        className={`${isOpen ? "" : "hidden"}`}
        aria-labelledby={`accordion-collapse-heading-${id}`}
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {content}
        </div>
      </div>
    </>
  );
}

export default FAQ;
