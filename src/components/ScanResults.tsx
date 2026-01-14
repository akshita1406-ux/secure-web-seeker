import { Shield, AlertTriangle, CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import VulnerabilityCard, { Vulnerability } from "./VulnerabilityCard";

interface ScanResultsProps {
  url: string;
  vulnerabilities: Vulnerability[];
}

const ScanResults = ({ url, vulnerabilities }: ScanResultsProps) => {
  const criticalCount = vulnerabilities.filter(v => v.severity === "critical" || v.severity === "high").length;
  const mediumCount = vulnerabilities.filter(v => v.severity === "medium").length;
  const lowCount = vulnerabilities.filter(v => v.severity === "low" || v.severity === "info").length;

  const handleExport = () => {
    const report = {
      scanDate: new Date().toISOString(),
      targetUrl: url,
      summary: {
        total: vulnerabilities.length,
        critical: criticalCount,
        medium: mediumCount,
        low: lowCount,
      },
      vulnerabilities,
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `vuln-report-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 mt-8 animate-fade-in">
      {/* Summary Card */}
      <div className="card-cyber rounded-xl p-6 mb-6 border-glow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <h2 className="font-bold text-lg text-foreground">Scan Complete</h2>
              <p className="text-sm font-mono text-muted-foreground truncate max-w-md">{url}</p>
            </div>
          </div>
          <Button
            onClick={handleExport}
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 text-primary"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-destructive/10 rounded-lg p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-2" />
            <div className="text-2xl font-bold text-destructive">{criticalCount}</div>
            <div className="text-xs font-mono text-muted-foreground">Critical/High</div>
          </div>
          <div className="bg-warning/10 rounded-lg p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-warning">{mediumCount}</div>
            <div className="text-xs font-mono text-muted-foreground">Medium</div>
          </div>
          <div className="bg-success/10 rounded-lg p-4 text-center">
            <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">{lowCount}</div>
            <div className="text-xs font-mono text-muted-foreground">Low/Info</div>
          </div>
        </div>
      </div>
      
      {/* Vulnerabilities List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="text-primary font-mono">[</span>
          Detected Vulnerabilities
          <span className="text-primary font-mono">]</span>
        </h3>
        
        {vulnerabilities.length === 0 ? (
          <div className="card-cyber rounded-lg p-8 text-center">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <p className="text-foreground font-semibold">No vulnerabilities detected</p>
            <p className="text-muted-foreground text-sm mt-2">The target appears to be secure</p>
          </div>
        ) : (
          vulnerabilities.map((vuln, index) => (
            <VulnerabilityCard key={vuln.id} vulnerability={vuln} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default ScanResults;
