import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PlagiarismCheckerProps {
  open: boolean;
  onClose: () => void;
  content: string;
}

export const PlagiarismChecker = ({ open, onClose, content }: PlagiarismCheckerProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCheck = () => {
    setIsChecking(true);
    // Simulate plagiarism check
    setTimeout(() => {
      const similarity = Math.random() * 15; // 0-15% similarity
      setResults({
        similarity: similarity.toFixed(1),
        status: similarity < 10 ? "pass" : "warning",
        matches: [
          { source: "IEEE Xplore Digital Library", similarity: (similarity * 0.4).toFixed(1) },
          { source: "SpringerLink", similarity: (similarity * 0.3).toFixed(1) },
          { source: "ArXiv Preprints", similarity: (similarity * 0.3).toFixed(1) }
        ]
      });
      setIsChecking(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            Plagiarism Detection
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!results && !isChecking && (
            <div className="text-center py-8">
              <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Check your content for originality against millions of academic sources
              </p>
              <Button onClick={handleCheck} variant="gradient" size="lg">
                Start Plagiarism Check
              </Button>
            </div>
          )}

          {isChecking && (
            <div className="space-y-4 py-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-medium mb-2">Analyzing Content...</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Checking against academic databases and repositories
                </p>
              </div>
              <Progress value={66} className="w-full" />
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <Card className={`border-2 ${results.status === "pass" ? "border-green-500/50 bg-green-500/5" : "border-yellow-500/50 bg-yellow-500/5"}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {results.status === "pass" ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-8 h-8 text-yellow-500" />
                      )}
                      <div>
                        <p className="text-lg font-bold">
                          {results.similarity}% Similarity Detected
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {results.status === "pass" ? "Content appears original" : "Minor similarities found"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-3xl font-bold ${results.status === "pass" ? "text-green-500" : "text-yellow-500"}`}>
                        {results.similarity}%
                      </p>
                    </div>
                  </div>

                  <Progress 
                    value={parseFloat(results.similarity)} 
                    className={`h-2 ${results.status === "pass" ? "[&>div]:bg-green-500" : "[&>div]:bg-yellow-500"}`}
                  />
                </CardContent>
              </Card>

              <div className="space-y-3">
                <p className="font-medium text-sm">Matched Sources:</p>
                {results.matches.map((match: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{match.source}</p>
                        <span className="text-sm text-muted-foreground">{match.similarity}% match</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Detailed Report
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
