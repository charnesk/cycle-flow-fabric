import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateProductionCapacity } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Bike, DollarSign } from "lucide-react";

export function ProductionCapacityChart() {
  const capacity = calculateProductionCapacity();
  
  const chartData = capacity.map(c => ({
    namn: c.cykel_typ,
    produktion: c.max_produktion,
    kostnad: c.kostnad_per_cykel
  }));

  const pieData = capacity.map(c => ({
    name: c.cykel_typ,
    value: c.max_produktion
  }));

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bike className="h-5 w-5" />
            Produktionskapacitet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="namn" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Bar 
                dataKey="produktion" 
                fill="hsl(var(--chart-1))" 
                name="Max Produktion"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {capacity.map(c => (
              <div key={c.cykel_typ} className="flex justify-between items-center p-2 rounded bg-muted">
                <span className="text-sm font-medium">{c.cykel_typ}</span>
                <div className="text-right">
                  <p className="text-sm font-semibold">{c.max_produktion} cyklar</p>
                  <p className="text-xs text-muted-foreground">Begränsas av: {c.begränsande_del}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Kostnadsanalys
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {capacity.map((c, index) => (
              <div key={c.cykel_typ} className="flex justify-between items-center p-2 rounded bg-muted">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm font-medium">{c.cykel_typ}</span>
                </div>
                <span className="text-sm font-semibold">{c.kostnad_per_cykel.toLocaleString('sv-SE')} SEK</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}