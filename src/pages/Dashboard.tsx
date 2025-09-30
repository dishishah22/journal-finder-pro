import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Tutorial } from "@/components/Tutorial";
import { FilterSidebar } from "@/components/FilterSidebar";
import { JournalCard } from "@/components/JournalCard";
import { ChatBot } from "@/components/ChatBot";
import { PlagiarismChecker } from "@/components/PlagiarismChecker";
import { AIContentDetector } from "@/components/AIContentDetector";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageSquare, Shield, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

const mockJournals = [
  {
    name: "Nature Communications",
    description: "An open access journal publishing high-quality research across all areas of the natural sciences, including physics, chemistry, earth sciences, medicine, and biology.",
    impactFactor: 16.6,
    acceptanceRate: 8,
    publishingCost: 5720,
    reviewTime: "8-10 weeks"
  },
  {
    name: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    description: "Covers traditional and emerging areas within the field of computer vision and pattern recognition, including machine learning, neural networks, and image analysis.",
    impactFactor: 24.3,
    acceptanceRate: 12,
    publishingCost: 2095,
    reviewTime: "6-8 weeks"
  },
  {
    name: "Journal of Machine Learning Research",
    description: "An open access journal covering machine learning research including theory, algorithms, and applications across diverse scientific and engineering domains.",
    impactFactor: 6.1,
    acceptanceRate: 22,
    publishingCost: 0,
    reviewTime: "10-12 weeks"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [budget, setBudget] = useState(3000);
  const [impactFactor, setImpactFactor] = useState(5);
  const [results, setResults] = useState<typeof mockJournals>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showPlagiarism, setShowPlagiarism] = useState(false);
  const [showAIDetector, setShowAIDetector] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/");
      return;
    }

    const shouldShowTutorial = localStorage.getItem("showTutorial");
    if (shouldShowTutorial === "true") {
      setShowTutorial(true);
      localStorage.removeItem("showTutorial");
    }
  }, [navigate]);

  const handleSearch = () => {
    if (!title.trim() || !abstract.trim()) {
      toast.error("Please enter both title and abstract");
      return;
    }

    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      const filtered = mockJournals.filter(
        journal => journal.publishingCost <= budget && journal.impactFactor >= impactFactor
      );
      setResults(filtered.length > 0 ? filtered : mockJournals.slice(0, 3));
      setIsSearching(false);
      toast.success(`Found ${filtered.length || 3} matching journals`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">
                    Paper Title
                  </Label>
                  <Textarea
                    id="title"
                    placeholder="Enter your research paper title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abstract" className="text-base font-semibold">
                    Abstract
                  </Label>
                  <Textarea
                    id="abstract"
                    placeholder="Paste your paper abstract here..."
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleSearch}
                  size="lg"
                  variant="gradient"
                  className="w-full"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Search Journals
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {results.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Top Journal Recommendations</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowChatBot(true)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ask AI
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPlagiarism(true)}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Check Plagiarism
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAIDetector(true)}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Detection
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {results.map((journal, index) => (
                    <JournalCard key={index} {...journal} rank={index + 1} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <FilterSidebar
              budget={budget}
              onBudgetChange={setBudget}
              impactFactor={impactFactor}
              onImpactFactorChange={setImpactFactor}
            />
          </div>
        </div>
      </main>

      <Tutorial open={showTutorial} onClose={() => setShowTutorial(false)} />
      <ChatBot open={showChatBot} onClose={() => setShowChatBot(false)} />
      <PlagiarismChecker
        open={showPlagiarism}
        onClose={() => setShowPlagiarism(false)}
        content={abstract}
      />
      <AIContentDetector
        open={showAIDetector}
        onClose={() => setShowAIDetector(false)}
        content={abstract}
      />
    </div>
  );
};

export default Dashboard;
