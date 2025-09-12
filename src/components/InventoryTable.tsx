import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { inventory, parts } from "@/data/mockData";
import { AlertCircle, CheckCircle, Package } from "lucide-react";

export function InventoryTable() {
  const inventoryWithDetails = inventory.map(inv => {
    const part = parts.find(p => p.del_id === inv.del_id);
    const stockPercentage = (inv.antal_i_lager / (inv.miniminivå * 3)) * 100;
    const status = inv.antal_i_lager <= inv.beställningspunkt 
      ? "critical" 
      : inv.antal_i_lager <= inv.miniminivå * 1.5 
      ? "warning" 
      : "good";
    
    return {
      ...inv,
      part,
      stockPercentage: Math.min(100, stockPercentage),
      status
    };
  }).sort((a, b) => a.stockPercentage - b.stockPercentage);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "critical":
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" /> Kritisk</Badge>;
      case "warning":
        return <Badge className="bg-warning text-warning-foreground gap-1"><Package className="h-3 w-3" /> Låg</Badge>;
      default:
        return <Badge className="bg-success text-success-foreground gap-1"><CheckCircle className="h-3 w-3" /> God</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Lagerstatus
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Del ID</TableHead>
              <TableHead>Namn</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>I Lager</TableHead>
              <TableHead>Min. Nivå</TableHead>
              <TableHead>Lagernivå</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryWithDetails.map((item) => (
              <TableRow key={item.del_id}>
                <TableCell className="font-medium">{item.del_id}</TableCell>
                <TableCell>{item.part?.del_namn}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.part?.kategori}</Badge>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{item.antal_i_lager}</span>
                </TableCell>
                <TableCell>{item.miniminivå}</TableCell>
                <TableCell className="w-[200px]">
                  <div className="space-y-1">
                    <Progress value={item.stockPercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">{Math.round(item.stockPercentage)}%</p>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}