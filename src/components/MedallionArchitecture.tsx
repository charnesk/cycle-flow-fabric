import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileJson, Sparkles } from "lucide-react";
import { getMedallionData } from "@/data/mockData";

export function MedallionArchitecture() {
  const medallionData = getMedallionData();

  const layers = [
    {
      name: "Bronze",
      description: "Rådata",
      data: medallionData.bronze,
      icon: <FileJson className="h-6 w-6" />,
      color: "bg-bronze text-white"
    },
    {
      name: "Silver",
      description: "Rensat & Strukturerat",
      data: medallionData.silver,
      icon: <Database className="h-6 w-6" />,
      color: "bg-silver text-foreground"
    },
    {
      name: "Gold",
      description: "Affärsredo",
      data: medallionData.gold,
      icon: <Sparkles className="h-6 w-6" />,
      color: "bg-gold text-foreground"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Microsoft Fabric - Medallion Architecture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {layers.map((layer, index) => (
            <div key={layer.name} className="relative">
              <div className={`p-6 rounded-lg ${layer.color} transition-all hover:shadow-lg`}>
                <div className="flex items-center gap-3 mb-4">
                  {layer.icon}
                  <div>
                    <h3 className="text-lg font-semibold">{layer.name}</h3>
                    <p className="text-sm opacity-90">{layer.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tabeller:</span>
                    <span className="font-medium">{layer.data.tables.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Poster:</span>
                    <span className="font-medium">{layer.data.records}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Format:</span>
                    <span className="font-medium">{layer.data.format}</span>
                  </div>
                </div>
              </div>
              {index < layers.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}