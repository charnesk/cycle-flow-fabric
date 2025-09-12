// Medallion Architecture Mock Data
// This represents data that would come from Microsoft Fabric Gold Layer

export interface Part {
  del_id: string;
  del_namn: string;
  kategori: string;
  kostnad_per_del: number;
  leverantör: string;
}

export interface InventoryStatus {
  del_id: string;
  antal_i_lager: number;
  miniminivå: number;
  beställningspunkt: number;
}

export interface BOM {
  cykel_typ: string;
  del_id: string;
  kvantitet: number;
}

export interface ProductionCapacity {
  cykel_typ: string;
  max_produktion: number;
  kostnad_per_cykel: number;
  begränsande_del: string;
}

// Sample Data - Bronze Layer (Raw)
export const parts: Part[] = [
  { del_id: "P001", del_namn: "Ram Carbon", kategori: "Ram", kostnad_per_del: 2500, leverantör: "CarbonTech AB" },
  { del_id: "P002", del_namn: "Framgaffel", kategori: "Gaffel", kostnad_per_del: 800, leverantör: "ForkMaster" },
  { del_id: "P003", del_namn: "Hjul 700c", kategori: "Hjul", kostnad_per_del: 400, leverantör: "WheelPro" },
  { del_id: "P004", del_namn: "Däck Continental", kategori: "Däck", kostnad_per_del: 150, leverantör: "Continental" },
  { del_id: "P005", del_namn: "Växelreglage Shimano", kategori: "Växel", kostnad_per_del: 1200, leverantör: "Shimano" },
  { del_id: "P006", del_namn: "Bromsar Hydrauliska", kategori: "Bromsar", kostnad_per_del: 600, leverantör: "BrakeTech" },
  { del_id: "P007", del_namn: "Sadel Sport", kategori: "Sadel", kostnad_per_del: 200, leverantör: "ComfortRide" },
  { del_id: "P008", del_namn: "Styre Aluminium", kategori: "Styre", kostnad_per_del: 150, leverantör: "AluBar" },
  { del_id: "P009", del_namn: "Kedja 11-speed", kategori: "Drivlina", kostnad_per_del: 80, leverantör: "ChainMaster" },
  { del_id: "P010", del_namn: "Pedaler Carbon", kategori: "Pedaler", kostnad_per_del: 250, leverantör: "PedalPro" },
  { del_id: "P011", del_namn: "Sadelstolpe", kategori: "Stolpe", kostnad_per_del: 120, leverantör: "PostTech" },
  { del_id: "P012", del_namn: "Handtag Gel", kategori: "Tillbehör", kostnad_per_del: 40, leverantör: "GripMaster" },
];

export const inventory: InventoryStatus[] = [
  { del_id: "P001", antal_i_lager: 45, miniminivå: 20, beställningspunkt: 30 },
  { del_id: "P002", antal_i_lager: 52, miniminivå: 20, beställningspunkt: 35 },
  { del_id: "P003", antal_i_lager: 120, miniminivå: 50, beställningspunkt: 80 },
  { del_id: "P004", antal_i_lager: 95, miniminivå: 50, beställningspunkt: 75 },
  { del_id: "P005", antal_i_lager: 28, miniminivå: 15, beställningspunkt: 25 },
  { del_id: "P006", antal_i_lager: 35, miniminivå: 20, beställningspunkt: 30 },
  { del_id: "P007", antal_i_lager: 65, miniminivå: 25, beställningspunkt: 40 },
  { del_id: "P008", antal_i_lager: 48, miniminivå: 25, beställningspunkt: 40 },
  { del_id: "P009", antal_i_lager: 150, miniminivå: 50, beställningspunkt: 100 },
  { del_id: "P010", antal_i_lager: 80, miniminivå: 40, beställningspunkt: 60 },
  { del_id: "P011", antal_i_lager: 55, miniminivå: 25, beställningspunkt: 40 },
  { del_id: "P012", antal_i_lager: 200, miniminivå: 100, beställningspunkt: 150 },
];

export const bom: BOM[] = [
  // Racing Bike
  { cykel_typ: "Racing", del_id: "P001", kvantitet: 1 },
  { cykel_typ: "Racing", del_id: "P002", kvantitet: 1 },
  { cykel_typ: "Racing", del_id: "P003", kvantitet: 2 },
  { cykel_typ: "Racing", del_id: "P004", kvantitet: 2 },
  { cykel_typ: "Racing", del_id: "P005", kvantitet: 1 },
  { cykel_typ: "Racing", del_id: "P006", kvantitet: 2 },
  { cykel_typ: "Racing", del_id: "P007", kvantitet: 1 },
  { cykel_typ: "Racing", del_id: "P008", kvantitet: 1 },
  { cykel_typ: "Racing", del_id: "P009", kvantitet: 1 },
  { cykel_typ: "Racing", del_id: "P010", kvantitet: 2 },
  { cykel_typ: "Racing", del_id: "P011", kvantitet: 1 },
  { cykel_typ: "Racing", del_id: "P012", kvantitet: 2 },
  // Mountain Bike (simplified)
  { cykel_typ: "Mountain", del_id: "P001", kvantitet: 1 },
  { cykel_typ: "Mountain", del_id: "P002", kvantitet: 1 },
  { cykel_typ: "Mountain", del_id: "P003", kvantitet: 2 },
  { cykel_typ: "Mountain", del_id: "P004", kvantitet: 2 },
  { cykel_typ: "Mountain", del_id: "P005", kvantitet: 1 },
  { cykel_typ: "Mountain", del_id: "P006", kvantitet: 2 },
  { cykel_typ: "Mountain", del_id: "P007", kvantitet: 1 },
  { cykel_typ: "Mountain", del_id: "P008", kvantitet: 1 },
  { cykel_typ: "Mountain", del_id: "P009", kvantitet: 1 },
  { cykel_typ: "Mountain", del_id: "P010", kvantitet: 2 },
  { cykel_typ: "Mountain", del_id: "P011", kvantitet: 1 },
  { cykel_typ: "Mountain", del_id: "P012", kvantitet: 2 },
];

// Gold Layer - Business Ready Calculations
export const calculateProductionCapacity = () => {
  const bikeTypes = ["Racing", "Mountain"];
  const capacity: ProductionCapacity[] = [];

  bikeTypes.forEach(type => {
    const bikeBOM = bom.filter(b => b.cykel_typ === type);
    let maxProduction = Infinity;
    let limitingPart = "";
    let totalCost = 0;

    bikeBOM.forEach(item => {
      const inv = inventory.find(i => i.del_id === item.del_id);
      const part = parts.find(p => p.del_id === item.del_id);
      
      if (inv && part) {
        const possibleUnits = Math.floor(inv.antal_i_lager / item.kvantitet);
        if (possibleUnits < maxProduction) {
          maxProduction = possibleUnits;
          limitingPart = part.del_namn;
        }
        totalCost += part.kostnad_per_del * item.kvantitet;
      }
    });

    capacity.push({
      cykel_typ: type,
      max_produktion: maxProduction === Infinity ? 0 : maxProduction,
      kostnad_per_cykel: totalCost,
      begränsande_del: limitingPart
    });
  });

  return capacity;
};

export const getPartsToReorder = () => {
  return inventory
    .filter(inv => inv.antal_i_lager <= inv.beställningspunkt)
    .map(inv => {
      const part = parts.find(p => p.del_id === inv.del_id);
      return {
        ...inv,
        del_namn: part?.del_namn || "",
        leverantör: part?.leverantör || "",
        kostnad_per_del: part?.kostnad_per_del || 0,
        beställ_antal: (inv.miniminivå * 2) - inv.antal_i_lager
      };
    });
};

export const getMedallionData = () => {
  return {
    bronze: {
      tables: ["raw_parts", "raw_inventory", "raw_bom"],
      records: parts.length + inventory.length + bom.length,
      format: "CSV/JSON"
    },
    silver: {
      tables: ["dim_parts", "dim_suppliers", "fact_inventory", "fact_bom"],
      records: Math.floor((parts.length + inventory.length + bom.length) * 0.9),
      format: "Parquet"
    },
    gold: {
      tables: ["production_capacity", "reorder_alerts", "cost_analysis"],
      records: calculateProductionCapacity().length + getPartsToReorder().length,
      format: "Delta Lake"
    }
  };
};