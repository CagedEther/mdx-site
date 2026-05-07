import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function Calculator() {
  const [bill, setBill] = useState(150);
  const [zip, setZip] = useState("");
  const [orientation, setOrientation] = useState("south");
  const [area, setArea] = useState(1000);
  
  const [results, setResults] = useState<{
    systemSize: number;
    cost: number;
    annualSavings: number;
    payback: number;
    totalSavings: number;
    itc: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const kwhMonth = bill / 0.13;
    let systemKw = (kwhMonth * 12) / 1400;
    
    // Adjust for orientation
    if (orientation === "east-west") systemKw *= 1.15;
    if (orientation === "north") systemKw *= 1.3;

    // Cap system size based on roof area (approx 15 sq ft per panel, 400W panels)
    const maxPanels = Math.floor(area / 15);
    const maxKw = maxPanels * 0.4;
    systemKw = Math.min(systemKw, maxKw);

    const cost = systemKw * 2800;
    const annualSavings = bill * 12 * 0.85;
    const itc = cost * 0.30;
    const netCost = cost - itc;
    const payback = netCost / annualSavings;
    const totalSavings = (annualSavings * 25) - netCost;

    setResults({
      systemSize: systemKw,
      cost,
      annualSavings,
      payback,
      totalSavings,
      itc
    });
  };

  return (
    <section id="calculator" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-background rounded-l-3xl -z-10 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Form */}
          <div className="bg-white rounded-3xl border border-black/5 shadow-xl p-8 md:p-12 relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight mb-8">Calculate your savings</h2>
            
            <form onSubmit={calculate} className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-base font-bold">Average Monthly Bill</Label>
                  <span className="font-mono font-bold text-primary">${bill}</span>
                </div>
                <Slider 
                  value={[bill]} 
                  onValueChange={(v) => setBill(v[0])} 
                  max={500} 
                  min={50} 
                  step={10}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-bold">ZIP Code</Label>
                <Input 
                  value={zip} 
                  onChange={(e) => setZip(e.target.value)} 
                  placeholder="e.g. 90210"
                  className="h-12 text-lg bg-background border-black/10 focus-visible:ring-primary"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-bold">Roof Orientation</Label>
                <Select value={orientation} onValueChange={setOrientation}>
                  <SelectTrigger className="h-12 text-lg bg-background border-black/10 focus-visible:ring-primary">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="south">South (Best)</SelectItem>
                    <SelectItem value="east-west">East/West (Good)</SelectItem>
                    <SelectItem value="north">North (Fair)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-base font-bold">Usable Roof Area</Label>
                  <span className="font-mono font-bold">{area} sq ft</span>
                </div>
                <Slider 
                  value={[area]} 
                  onValueChange={(v) => setArea(v[0])} 
                  max={3000} 
                  min={200} 
                  step={100}
                  className="py-4"
                />
              </div>

              <Button type="submit" className="w-full h-14 rounded-full text-lg font-bold shadow-lg hover:-translate-y-0.5 transition-transform duration-200">
                Generate Estimate
              </Button>
            </form>
          </div>

          {/* Results */}
          <div className="py-8 lg:py-12">
            {results ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div>
                  <h3 className="text-xl font-semibold text-foreground/60 uppercase tracking-wider mb-2">Your 25-Year ROI</h3>
                  <div className="text-6xl md:text-7xl font-extrabold text-primary tracking-tight">
                    ${Math.round(results.totalSavings).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
                  <div>
                    <div className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-1">System Size</div>
                    <div className="text-3xl font-bold">{results.systemSize.toFixed(1)} kW</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-1">Payback</div>
                    <div className="text-3xl font-bold">{results.payback.toFixed(1)} yrs</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-black/5">
                    <span className="font-medium text-foreground/70">Gross Cost</span>
                    <span className="font-bold">${Math.round(results.cost).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-black/5">
                    <span className="font-medium text-primary">Federal Tax Credit (30%)</span>
                    <span className="font-bold text-primary">-${Math.round(results.itc).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">Net Cost</span>
                    <span className="font-bold">${Math.round(results.cost - results.itc).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-background p-4 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl font-bold shadow-sm">
                    ✨
                  </div>
                  <div>
                    <div className="font-bold">Estimated Annual Savings</div>
                    <div className="text-primary font-bold text-xl">${Math.round(results.annualSavings).toLocaleString()} / year</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-6 py-20 lg:py-0">
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
                </div>
                <h3 className="text-2xl font-bold">Waiting for input...</h3>
                <p className="max-w-sm text-lg">Adjust the sliders and enter your zip code to see your personalized solar estimate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
