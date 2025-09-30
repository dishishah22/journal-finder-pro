import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, MessageSquare, Shield, Sparkles, ChevronRight } from "lucide-react";

interface TutorialProps {
  open: boolean;
  onClose: () => void;
}

const tutorialSteps = [
  {
    icon: BookOpen,
    title: "Welcome to Research Journal Finder",
    description: "Your intelligent assistant for finding the perfect academic journals for your research papers.",
    color: "from-primary to-secondary"
  },
  {
    icon: Search,
    title: "Search for Journals",
    description: "Enter your paper's title and abstract, then use filters like budget and impact factor to find the top 3 matching journals.",
    color: "from-secondary to-accent"
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Assistant",
    description: "Ask our AI chatbot questions about recommended journals, submission guidelines, or publishing insights.",
    color: "from-accent to-primary"
  },
  {
    icon: Shield,
    title: "Plagiarism Check",
    description: "Ensure your work is original with our built-in plagiarism detection tool before submission.",
    color: "from-primary to-secondary"
  },
  {
    icon: Sparkles,
    title: "AI Content Detection",
    description: "Verify your content authenticity with AI-generated content detection to maintain academic integrity.",
    color: "from-secondary to-accent"
  }
];

export const Tutorial = ({ open, onClose }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl border-0 shadow-2xl">
        <DialogHeader>
          <div className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          <DialogTitle className="text-2xl text-center">{step.title}</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {step.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-2 py-4">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-8 bg-primary"
                  : index < currentStep
                  ? "w-2 bg-primary/50"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip Tutorial
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1"
            variant="gradient"
          >
            {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
