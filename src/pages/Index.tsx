import { KPICard } from "@/components/KPICard";
import { MedallionArchitecture } from "@/components/MedallionArchitecture";
import { InventoryTable } from "@/components/InventoryTable";
import { ProductionCapacityChart } from "@/components/ProductionCapacityChart";
import { ReorderAlerts } from "@/components/ReorderAlerts";
import { BOMVisualization } from "@/components/BOMVisualization";
import { CICDPipeline } from "@/components/CICDPipeline";
import { calculateProductionCapacity, getPartsToReorder, inventory, parts } from "@/data/mockData";
import { Bike, Package, AlertTriangle, DollarSign, Factory, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const capacity = calculateProductionCapacity();
  const totalBikes = capacity.reduce((sum, c) => sum + c.max_produktion, 0);
  const partsToReorder = getPartsToReorder();
  const totalInventoryValue = inventory.reduce((sum, inv) => {
    const part = parts.find(p => p.del_id === inv.del_id);
    return sum + (inv.antal_i_lager * (part?.kostnad_per_del || 0));
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-carbon text-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Factory className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">BikeProduction Dashboard</h1>
                <p className="text-sm opacity-90">Microsoft Fabric Medallion Architecture</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span className="text-sm">v1.0.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard
            title="Total Produktionskapacitet"
            value={totalBikes}
            subtitle="cyklar"
            icon={<Bike className="h-5 w-5" />}
            variant="primary"
            trend="up"
            change={12}
          />
          <KPICard
            title="Lagervärde"
            value={`${(totalInventoryValue / 1000).toFixed(0)}k`}
            subtitle="SEK"
            icon={<DollarSign className="h-5 w-5" />}
            variant="success"
            trend="up"
            change={8}
          />
          <KPICard
            title="Delar i Lager"
            value={parts.length}
            subtitle="unika delar"
            icon={<Package className="h-5 w-5" />}
            variant="default"
            trend="neutral"
            change={0}
          />
          <KPICard
            title="Kritiska Delar"
            value={partsToReorder.length}
            subtitle="behöver beställas"
            icon={<AlertTriangle className="h-5 w-5" />}
            variant={partsToReorder.length > 0 ? "warning" : "success"}
            trend={partsToReorder.length > 0 ? "down" : "up"}
            change={-15}
          />
        </div>

        {/* Medallion Architecture */}
        <div className="mb-6">
          <MedallionArchitecture />
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="production" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="production">Produktion</TabsTrigger>
            <TabsTrigger value="inventory">Lager</TabsTrigger>
            <TabsTrigger value="bom">BOM</TabsTrigger>
            <TabsTrigger value="cicd">CI/CD</TabsTrigger>
          </TabsList>

          <TabsContent value="production" className="space-y-4">
            <ProductionCapacityChart />
            <ReorderAlerts />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <InventoryTable />
          </TabsContent>

          <TabsContent value="bom" className="space-y-4">
            <BOMVisualization />
          </TabsContent>

          <TabsContent value="cicd" className="space-y-4">
            <CICDPipeline />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;