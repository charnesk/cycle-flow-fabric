import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getPartsToReorder } from "@/data/mockData";
import { AlertTriangle, ShoppingCart, Package2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ReorderAlerts() {
  const partsToReorder = getPartsToReorder();
  const totalReorderCost = partsToReorder.reduce((sum, part) => 
    sum + (part.beställ_antal * part.kostnad_per_del), 0
  );

  if (partsToReorder.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package2 className="h-5 w-5" />
            Beställningsstatus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-success bg-success/10">
            <AlertTitle>Alla delar har tillräcklig lagernivå</AlertTitle>
            <AlertDescription>
              Ingen beställning behövs för tillfället.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Beställningsvarningar
          <Badge variant="destructive">{partsToReorder.length} delar</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert className="border-warning bg-warning/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Delar behöver beställas</AlertTitle>
            <AlertDescription>
              {partsToReorder.length} delar har nått beställningspunkten
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            {partsToReorder.map(part => (
              <div key={part.del_id} className="p-4 rounded-lg border bg-card">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{part.del_namn}</h4>
                    <p className="text-sm text-muted-foreground">
                      Leverantör: {part.leverantör}
                    </p>
                  </div>
                  <Badge variant="outline">{part.del_id}</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">I lager</p>
                    <p className="font-semibold text-destructive">{part.antal_i_lager}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min. nivå</p>
                    <p className="font-semibold">{part.miniminivå}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Beställ antal</p>
                    <p className="font-semibold text-primary">{part.beställ_antal}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Kostnad</p>
                    <p className="font-semibold">
                      {(part.beställ_antal * part.kostnad_per_del).toLocaleString('sv-SE')} SEK
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total beställningskostnad:</span>
              <span className="text-2xl font-bold text-primary">
                {totalReorderCost.toLocaleString('sv-SE')} SEK
              </span>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 gap-2" variant="default">
                <ShoppingCart className="h-4 w-4" />
                Skapa beställning
              </Button>
              <Button variant="outline">
                Exportera till Excel
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}