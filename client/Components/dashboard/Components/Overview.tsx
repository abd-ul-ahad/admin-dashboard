"use client";
import { useMemo, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import Loading from "@/Components/Loading";

interface MonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
  _id: string;
}

interface DailyData {
  date: string;
  totalSales: number;
  totalUnits: number;
  _id: string;
}

interface SalesByCategory {
  shoes: number;
  clothing: number;
  accessories: number;
  misc: number;
}

interface ApiResponse {
  _id: string;
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
  salesByCategory: SalesByCategory;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Overview = () => {
  const [overviewData, setOverviewData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<string>("sales");

  const callApi = () => {
    return new Promise<void>((resolve, reject) => {
      fetch("http://localhost:8080/api/v1/sales/")
        .then((resp) => resp.json())
        .then((data: ApiResponse) => {
          setOverviewData(data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    callApi()
      .then(() => {
        setLoading(false);
        console.log(overviewData);
      })
      .catch((error) => {
        console.error("API call error:", error);
        setLoading(false);
      });
  }, []);

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!overviewData) return [[], []];

    const { monthlyData } = overviewData;
    const totalSalesLine = {
      id: "totalSales",
      color: "red",
      data: [] as { x: string; y: number }[],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: "blue",
      data: [] as { x: string; y: number }[],
    };

    monthlyData.reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [overviewData]);

  return (
    <div className="h-screen">
      <div className="w-full py-2 text-[var(--text-color)]">
        <div>
          <h2 className="text-2xl font-bold mb-1">Overview</h2>
          <p className="text-sm">
            Overview of sales in year {overviewData?.year}
          </p>
        </div>
        <div className="mt-1">
          <button
            className={`text-xs px-4 mr-2 rounded-full ${
              view === "sales" && "bg-[var(--background-tab)] text-[var(--sidebar-active-text)]"
            }`}
            style={{ border: "1px solid var(--background-tab)" }}
            onClick={() => setView("sales")}
          >
            Sales
          </button>
          <button
            className={`text-xs px-4 rounded-full ${
              view === "units" && "bg-[var(--background-tab)] text-[var(--sidebar-active-text)]"
            }`}
            style={{ border: "1px solid var(--background-tab)" }}
            onClick={() => setView("units")}
          >
            Units
          </button>
        </div>
      </div>
      <div className="flex justify-start items-start h-full">
        {overviewData === null ? (
          <Loading />
        ) : (
          <ResponsiveLine
            data={view === "units" ? totalUnitsLine : totalSalesLine}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            theme={{
              textColor: "var(--text-color)",
            }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Months",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            // axisLeft={{
            //   tickSize: 5,
            //   tickPadding: 5,
            //   tickRotation: 0,
            //   legend: "count",
            //   legendOffset: -45,
            //   legendPosition: "middle",
            // }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "var(--text-color)",
                itemTextColor: "var(--text-color)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "var(--background-secondary)",
                      itemOpacity: 1,
                    },
                  },
                ],
                itemBackground: "var(--background-secondary)",
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Overview;
