"use client";
import Loading from "@/Components/Loading";
import { ResponsiveChoropleth } from "@nivo/geo";
import { useEffect, useState } from "react";
import { geoConstantData } from "@/store/geoData";

interface GeoData {
  id: string;
  value: number;
}

const Geography = () => {
  const [geoData, setGeoData] = useState<GeoData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const callApi = () => {
    return new Promise<void>((resolve, reject) => {
      fetch("http://localhost:8080/api/v1/geography")
        .then((resp) => resp.json())
        .then((data) => {
          const mappedLocations = data.reduce(
            (acc: any, { country }: { country: string }) => {
              if (!acc[country]) {
                acc[country] = 0;
              }
              acc[country]++;
              return acc;
            },
            {}
          );

          const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
              return { id: country, value: Number(count) };
            }
          );

          setGeoData(formattedLocations);
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
        console.log(geoData);
      })
      .catch((error) => {
        console.error("API call error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-screen">
      <div className="w-full text-[var(--text-color)] py-2">
        <h2 className="text-2xl font-bold mb-1">GEOGRAPHY</h2>
        <p className="text-sm">Find where your users are located</p>
      </div>

      {geoData === null ? (
        <Loading />
      ) : (
        <ResponsiveChoropleth
          data={geoData || []}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: "red",
                },
              },
              legend: {
                text: {
                  fill: "red",
                },
              },
              ticks: {
                line: {
                  stroke: "red",
                  strokeWidth: 1,
                },
                text: {
                  fill: "red",
                },
              },
            },
            legends: {
              text: {
                fill: "red",
              },
            },
            tooltip: {
              container: {
                color: "green",
              },
            },
          }}
          features={geoConstantData?.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          domain={[0, 60]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={150}
          projectionTranslation={[0.45, 0.6]}
          projectionRotation={[0, 0, 0]}
          borderWidth={1.3}
          borderColor="white"
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: true,
              translateX: -50,
              translateY: -155,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: "var(--text-color)",
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "grey",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
};

export default Geography;
