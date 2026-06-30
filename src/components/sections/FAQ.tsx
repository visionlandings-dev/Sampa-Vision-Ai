'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { FAQ_ITEMS } from '@/config/content'

export function FAQ() {
  return (
    <AnimatedSection
      id="faq"
      className="py-section-sm md:py-section border-t border-[rgba(100,100,180,0.12)]"
    >
      <div className="container-main max-w-3xl">
        <SectionLabel>Dúvidas frequentes</SectionLabel>
        <h2 className="font-display font-bold text-display-md text-bone mt-4 mb-10">
          Perguntas que todo cliente faz.
        </h2>

        <Accordion.Root type="single" collapsible className="space-y-0">
          {FAQ_ITEMS.map((item, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="border-b border-[rgba(100,100,180,0.12)] first:border-t"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className="group w-full flex items-center justify-between gap-6 py-5 text-left font-mono text-body-sm md:text-base text-ghost hover:text-bone transition-colors focus-visible:outline-none focus-visible:text-electric data-[state=open]:text-electric"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 text-stone group-data-[state=open]:text-electric group-data-[state=open]:rotate-180 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-body-sm font-body text-fog leading-relaxed data-[state=open]:animate-[accordion-down_0.3s_ease-out] data-[state=closed]:animate-[accordion-up_0.3s_ease-out] pb-5">
                {item.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </AnimatedSection>
  )
}
