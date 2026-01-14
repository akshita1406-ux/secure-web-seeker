import { useState } from "react";
import { Search, Loader2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ScannerInputProps {
  onScan: (url: string) => void;
  isScanning: boolean;
}

const ScannerInput = ({ onScan, isScanning }: ScannerInputProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (input: string): boolean => {
    try {
      const urlObj = new URL(input);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Please enter a URL to scan");
      return;
    }
    
    if (!validateUrl(trimmedUrl)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    
    onScan(trimmedUrl);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="card-cyber rounded-xl p-1 glow-cyan">
          <div className="flex items-center gap-2 bg-card rounded-lg p-2">
            <Globe className="w-5 h-5 text-primary ml-3 flex-shrink-0" />
            <Input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="Enter target URL (e.g., https://example.com)"
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-foreground placeholder:text-muted-foreground"
              disabled={isScanning}
            />
            <Button
              type="submit"
              disabled={isScanning}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 glow-cyan"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Scan
                </>
              )}
            </Button>
          </div>
        </div>
        
        {error && (
          <p className="text-destructive text-sm mt-2 font-mono text-center">
            {error}
          </p>
        )}
      </form>
      
      <p className="text-center text-muted-foreground text-xs mt-4 font-mono">
        ⚠️ Only scan websites you own or have permission to test
      </p>
    </div>
  );
};

export default ScannerInput;
