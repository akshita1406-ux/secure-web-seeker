import { useState, useCallback } from "react";
import ScannerHeader from "@/components/ScannerHeader";
import ScannerInput from "@/components/ScannerInput";
import ScanProgress from "@/components/ScanProgress";
import ScanResults from "@/components/ScanResults";
import { Vulnerability } from "@/components/VulnerabilityCard";
import { generateMockVulnerabilities } from "@/lib/mockScanData";

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedUrl, setScannedUrl] = useState("");
  const [results, setResults] = useState<Vulnerability[] | null>(null);

  const handleScan = (url: string) => {
    setIsScanning(true);
    setScannedUrl(url);
    setResults(null);
  };

  const handleScanComplete = useCallback(() => {
    setIsScanning(false);
    // Generate mock vulnerabilities for demo
    const mockResults = generateMockVulnerabilities(scannedUrl);
    setResults(mockResults);
  }, [scannedUrl]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background grid effect */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(170 100% 50% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(170 100% 50% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <ScannerHeader />
        
        <main className="pb-16">
          <ScannerInput onScan={handleScan} isScanning={isScanning} />
          
          <ScanProgress 
            isScanning={isScanning} 
            onComplete={handleScanComplete} 
          />
          
          {results !== null && (
            <ScanResults url={scannedUrl} vulnerabilities={results} />
          )}
        </main>
        
        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-xs font-mono text-muted-foreground border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <p>TASK-2 • Web Application Vulnerability Scanner • Educational Use Only</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
