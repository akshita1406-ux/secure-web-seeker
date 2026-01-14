import { Shield, Terminal } from "lucide-react";

const ScannerHeader = () => {
  return (
    <header className="relative py-12 px-6 text-center">
      <div className="absolute inset-0 scanline opacity-20" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <Shield className="w-12 h-12 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <Terminal className="w-10 h-10 text-accent" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          <span className="text-gradient-cyber">VulnScanner</span>
        </h1>
        
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-mono">
          Web Application Vulnerability Detection Tool
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-6 text-sm font-mono text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            SQL Injection
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-warning rounded-full animate-pulse" />
            XSS Detection
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
            CSRF Analysis
          </span>
        </div>
      </div>
    </header>
  );
};

export default ScannerHeader;
