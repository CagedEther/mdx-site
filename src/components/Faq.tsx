import { faqContent } from "@/content/data";
import FaqMdx from "@/content/faq.mdx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-12 text-center">
          {faqContent.title}
        </h2>

        <div className="mb-16 prose prose-lg prose-headings:font-bold prose-a:text-primary max-w-none">
          <FaqMdx />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqContent.items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-black/10 py-2">
              <AccordionTrigger className="text-lg md:text-xl font-bold hover:no-underline hover:text-primary transition-colors text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-lg text-foreground/70 leading-relaxed pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
