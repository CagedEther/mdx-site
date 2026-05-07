import { Sun } from "lucide-react";

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-black/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
          <Sun className="w-6 h-6 text-primary" fill="currentColor" />
          SolarCalc
        </a>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80">
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#calculator" 
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors shadow-sm"
          >
            Calculate Now
          </a>
        </div>
      </div>
    </nav>
  );
}
