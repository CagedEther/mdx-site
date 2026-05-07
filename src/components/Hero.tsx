import { motion } from "framer-motion";
import { heroContent } from "@/content/data";
import HeroMdx from "@/content/hero.mdx";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-black/5 text-sm font-semibold tracking-wide text-foreground mb-6">
              {heroContent.badge}
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {heroContent.headline}{" "}
            <span className="text-primary block md:inline">{heroContent.headlineAccent}</span>
          </motion.h1>

          <motion.div 
            className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {heroContent.subheadline}
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="#calculator" 
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
            >
              {heroContent.ctaPrimary}
            </a>
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
            >
              {heroContent.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div 
          className="max-w-4xl mx-auto border-t border-black/10 pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {heroContent.stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Prose from MDX */}
        <motion.div
          className="max-w-3xl mx-auto mt-24 prose prose-lg prose-headings:font-bold prose-a:text-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <HeroMdx />
        </motion.div>
      </div>
    </section>
  );
}
