import { motion } from "framer-motion";
import { howItWorksContent } from "@/content/data";
import HowItWorksMdx from "@/content/how-it-works.mdx";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            {howItWorksContent.title}
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            {howItWorksContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-16 right-16 h-[2px] bg-black/5" />

          {howItWorksContent.steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white border-4 border-background flex items-center justify-center text-3xl font-black text-primary shadow-sm mb-8">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-24 text-center prose prose-lg prose-headings:font-bold prose-a:text-primary">
          <HowItWorksMdx />
        </div>
      </div>
    </section>
  );
}
