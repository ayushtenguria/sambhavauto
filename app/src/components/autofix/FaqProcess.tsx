
'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { faqs, processSteps } from '../../lib/autofix-data';

export function FaqProcess() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="bg-white py-20 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="text-4xl font-extrabold text-[#16263B] mb-8"
          >
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="font-bold text-lg text-left hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2
            style={{ fontFamily: 'Syne, sans-serif' }}
            className="text-4xl font-extrabold text-[#16263B] mb-8"
          >
            Our Process
          </h2>
          <div className="space-y-8">
            {processSteps.map((step) => (
              <div key={step.number} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-lg">
                  {step.number.toString().padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#16263B]">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
