import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bom, parts } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Wrench, Package } from "lucide-react";

export function BOMVisualization() {
  const bikeTypes = ["Racing", "Mountain"];

  const getBOMForBike = (bikeType: string) => {
    return bom
      .filter(b => b.cykel_typ === bikeType)
      .map(b => {
        const part = parts.find(p => p.del_id === b.del_id);
        return {
          ...b,
          part
        };
      });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Ram": "bg-chart-1",
      "Gaffel": "bg-chart-2",
      "Hjul": "bg-chart-3",
      "Däck": "bg-chart-4",
      "Växel": "bg-chart-5",
      "Bromsar": "bg-warning",
      "Sadel": "bg-success",
      "Styre": "bg-primary",
      "Drivlina": "bg-accent",
      "Pedaler": "bg-bronze",
      "Stolpe": "bg-silver",
      "Tillbehör": "bg-gold"
    };
    return colors[category] || "bg-muted";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Bill of Materials (BOM)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Racing">
          <TabsList className="grid w-full grid-cols-2">
            {bikeTypes.map(type => (
              <TabsTrigger key={type} value={type}>
                {type} Cykel
              </TabsTrigger>
            ))}
          </TabsList>
          {bikeTypes.map(type => {
            const bomItems = getBOMForBike(type);
            const totalCost = bomItems.reduce((sum, item) => 
              sum + (item.part?.kostnad_per_del || 0) * item.kvantitet, 0
            );

            return (
              <TabsContent key={type} value={type} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {bomItems.map((item, index) => (
                    <div
                      key={`${item.del_id}-${index}`}
                      className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.part?.del_namn}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={`${getCategoryColor(item.part?.kategori || "")} text-white border-0`}
                            >
                              {item.part?.kategori}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3 text-muted-foreground" />
                            <span className="text-lg font-bold">{item.kvantitet}x</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 border-t mt-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Kostnad/st:</span>
                          <span className="font-medium">{item.part?.kostnad_per_del} SEK</span>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-muted-foreground">Total:</span>
                          <span className="font-semibold text-primary">
                            {((item.part?.kostnad_per_del || 0) * item.kvantitet).toLocaleString('sv-SE')} SEK
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-lg bg-gradient-primary text-primary-foreground">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total kostnad per cykel:</span>
                    <span className="text-2xl font-bold">{totalCost.toLocaleString('sv-SE')} SEK</span>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}