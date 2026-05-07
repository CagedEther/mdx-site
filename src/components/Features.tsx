import { motion } from "framer-motion";
import { featuresContent } from "@/content/data";
import FeaturesMdx from "@/content/features.mdx";
import * as Icons from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            {featuresContent.title}
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            {featuresContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {featuresContent.features.map((feature, i) => {
            const Icon = (Icons as any)[feature.icon];
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center mb-6 shadow-sm border border-black/5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-3xl mt-24 prose prose-lg prose-headings:font-bold prose-a:text-primary">
          <FeaturesMdx />
        </div>
      </div>
    </section>
  );
}
