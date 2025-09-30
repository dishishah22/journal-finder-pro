import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, Filter } from "lucide-react";

interface FilterSidebarProps {
  budget: number;
  onBudgetChange: (value: number) => void;
  impactFactor: number;
  onImpactFactorChange: (value: number) => void;
}

export const FilterSidebar = ({
  budget,
  onBudgetChange,
  impactFactor,
  onImpactFactorChange
}: FilterSidebarProps) => {
  return (
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="w-5 h-5" />
          Search Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Budget
            </Label>
            <span className="text-sm font-semibold text-primary">
              ${budget}
            </span>
          </div>
          <Slider
            value={[budget]}
            onValueChange={(values) => onBudgetChange(values[0])}
            max={5000}
            step={100}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$5000</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              Minimum Impact Factor
            </Label>
            <span className="text-sm font-semibold text-secondary">
              {impactFactor.toFixed(1)}
            </span>
          </div>
          <Slider
            value={[impactFactor]}
            onValueChange={(values) => onImpactFactorChange(values[0])}
            max={10}
            step={0.1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.0</span>
            <span>10.0</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Label className="text-sm font-medium">Subject Area</Label>
          <Select defaultValue="any">
            <SelectTrigger>
              <SelectValue placeholder="Select area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Subject</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="eng">Engineering</SelectItem>
              <SelectItem value="med">Medicine</SelectItem>
              <SelectItem value="bio">Biology</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chem">Chemistry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Open Access</Label>
          <Select defaultValue="any">
            <SelectTrigger>
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              <SelectItem value="yes">Open Access Only</SelectItem>
              <SelectItem value="no">Traditional Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <p className="font-medium text-foreground mb-1">💡 Search Tip</p>
          <p>Adjust filters to narrow down the best journals for your research and budget.</p>
        </div>
      </CardContent>
    </Card>
  );
};
