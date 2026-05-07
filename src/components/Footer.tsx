import { Sun } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-12 mb-8">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
            <Sun className="w-8 h-8 text-primary" fill="currentColor" />
            SolarCalc
          </div>
          <div className="flex gap-8 font-medium">
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#calculator" className="hover:text-primary transition-colors">Calculator</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/50">
          <p>© {new Date().getFullYear()} SolarCalc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
