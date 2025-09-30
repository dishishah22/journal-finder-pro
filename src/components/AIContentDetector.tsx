import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, AlertCircle, CheckCircle, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AIContentDetectorProps {
  open: boolean;
  onClose: () => void;
  content: string;
}

export const AIContentDetector = ({ open, onClose, content }: AIContentDetectorProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCheck = () => {
    setIsChecking(true);
    // Simulate AI detection
    setTimeout(() => {
      const aiProbability = Math.random() * 20; // 0-20% AI-generated
      setResults({
        aiProbability: aiProbability.toFixed(1),
        humanProbability: (100 - aiProbability).toFixed(1),
        status: aiProbability < 15 ? "human" : "mixed",
        sections: [
          { name: "Introduction", aiScore: (aiProbability * 0.8).toFixed(1), status: "human" },
          { name: "Methodology", aiScore: (aiProbability * 1.2).toFixed(1), status: "human" },
          { name: "Results", aiScore: (aiProbability * 0.9).toFixed(1), status: "human" },
          { name: "Conclusion", aiScore: (aiProbability * 1.1).toFixed(1), status: "human" }
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            AI Content Detection
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!results && !isChecking && (
            <div className="text-center py-8">
              <Sparkles className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Analyze your content to detect AI-generated text and ensure authenticity
              </p>
              <Button onClick={handleCheck} variant="gradient" size="lg">
                Start AI Detection
              </Button>
            </div>
          )}

          {isChecking && (
            <div className="space-y-4 py-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <p className="text-lg font-medium mb-2">Analyzing Content...</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Detecting AI-generated patterns and authenticity markers
                </p>
              </div>
              <Progress value={66} className="w-full" />
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <Card className={`border-2 ${results.status === "human" ? "border-green-500/50 bg-green-500/5" : "border-yellow-500/50 bg-yellow-500/5"}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {results.status === "human" ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-yellow-500" />
                      )}
                      <div>
                        <p className="text-lg font-bold">
                          {results.humanProbability}% Human-Written
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {results.status === "human" ? "Content appears authentic" : "Some AI patterns detected"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-green-500/10">
                      <p className="text-3xl font-bold text-green-500">{results.humanProbability}%</p>
                      <p className="text-sm text-muted-foreground mt-1">Human</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-red-500/10">
                      <p className="text-3xl font-bold text-red-500">{results.aiProbability}%</p>
                      <p className="text-sm text-muted-foreground mt-1">AI-Generated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <p className="font-medium text-sm">Section Analysis:</p>
                {results.sections.map((section: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">{section.name}</p>
                        <span className="text-xs text-muted-foreground">{section.aiScore}% AI</span>
                      </div>
                      <Progress 
                        value={parseFloat(section.aiScore)} 
                        className="h-1.5"
                      />
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
