import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp, DollarSign, Clock, Award } from "lucide-react";

interface JournalCardProps {
  name: string;
  description: string;
  impactFactor: number;
  acceptanceRate: number;
  publishingCost: number;
  reviewTime: string;
  rank: number;
}

export const JournalCard = ({
  name,
  description,
  impactFactor,
  acceptanceRate,
  publishingCost,
  reviewTime,
  rank
}: JournalCardProps) => {
  const getRankBadge = () => {
    const variants = ["default", "secondary", "outline"] as const;
    return variants[rank - 1] || "default";
  };

  return (
    <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={getRankBadge()} className="text-xs font-bold">
                #{rank}
              </Badge>
              {impactFactor >= 5 && (
                <Badge variant="outline" className="text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  High Impact
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
            <TrendingUp className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Impact Factor</p>
              <p className="text-sm font-bold text-primary">{impactFactor.toFixed(1)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/5">
            <Award className="w-4 h-4 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Acceptance</p>
              <p className="text-sm font-bold text-secondary">{acceptanceRate}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/5">
            <DollarSign className="w-4 h-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Cost</p>
              <p className="text-sm font-bold text-accent">${publishingCost}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <Clock className="w-4 h-4 text-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Review</p>
              <p className="text-sm font-bold">{reviewTime}</p>
            </div>
          </div>
        </div>

        <Button className="w-full" variant="outline" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Journal Details
        </Button>
      </CardContent>
    </Card>
  );
};
