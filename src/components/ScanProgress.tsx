import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface ScanProgressProps {
  isScanning: boolean;
  onComplete: () => void;
}

const scanStages = [
  "Initializing scanner...",
  "Checking SQL Injection vulnerabilities...",
  "Testing for XSS vulnerabilities...",
  "Analyzing CSRF protection...",
  "Scanning security headers...",
  "Checking for sensitive data exposure...",
  "Analyzing IDOR vulnerabilities...",
  "Generating report...",
];

const ScanProgress = ({ isScanning, onComplete }: ScanProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!isScanning) {
      setProgress(0);
      setCurrentStage(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isScanning, onComplete]);

  useEffect(() => {
    const stageIndex = Math.floor((progress / 100) * scanStages.length);
    setCurrentStage(Math.min(stageIndex, scanStages.length - 1));
  }, [progress]);

  if (!isScanning && progress === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-6 mt-8 animate-fade-in">
      <div className="card-cyber rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-mono text-primary">
            {scanStages[currentStage]}
          </span>
          <span className="text-sm font-mono text-muted-foreground">
            {progress}%
          </span>
        </div>
        
        <div className="relative">
          <Progress value={progress} className="h-2 bg-muted" />
          <div 
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {scanStages.map((stage, index) => (
            <span
              key={stage}
              className={`text-xs font-mono px-2 py-1 rounded ${
                index < currentStage
                  ? "bg-success/20 text-success"
                  : index === currentStage
                  ? "bg-primary/20 text-primary animate-pulse"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanProgress;
