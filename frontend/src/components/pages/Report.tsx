import React, { useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Slide, Zoom } from "react-awesome-reveal";

type DiseaseReport = {
  id: number;
  province: string;
  region: string;
  disease_name: string;
  severity: number; // แปลงเป็นตัวเลขสำหรับ PieChart
  latitude: number;
  longitude: number;
  image_path: string;
};

const COLORS = ["#4ade80", "#22d3ee", "#facc15", "#f97316", "#f43f5e", "#8b5cf6"];

export default function Report() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAtQq7VaNfQTFJLt4X10G21w4rVctLZr6c",
  });

  const [reports, setReports] = useState<DiseaseReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"region" | "province">("region");
  const [selectedValue, setSelectedValue] = useState<string>("ทั้งหมด");
  const [selectedReport, setSelectedReport] = useState<DiseaseReport | null>(null);

  // Fetch backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:3000/Statistic");
        if (!res.ok) throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
        const json = await res.json();

        const data: DiseaseReport[] = json.data.flatMap((item: any) => {
          return item.DiseaseInformations.AnalysisResults.map((ar: any) => {
            const provName = item.Provinces.province_name;
            const regionName = item.Provinces.Region.region_name || "ไม่ระบุ";
            const coords = ar.RiceImages
              ? {
                  lat: ar.RiceImages.latitude,
                  lng: ar.RiceImages.longitude,
                }
              : { lat: 15.0, lng: 100.0 };

            return {
              id: ar.id,
              province: provName,
              region: regionName,
              disease_name: ar.predicted_deficiency,
              severity: item.total_case || 1, // เป็น number สำหรับ PieChart
              latitude: coords.lat,
              longitude: coords.lng,
              image_path: ar.RiceImages?.image_path || "",
            };
          });
        });

        setReports(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filterOptions = useMemo(() => {
    if (filterType === "region") {
      return ["ทั้งหมด", ...Array.from(new Set(reports.map((r) => r.region)))];
    } else {
      return ["ทั้งหมด", ...Array.from(new Set(reports.map((r) => r.province)))];
    }
  }, [filterType, reports]);

  const filteredReports = useMemo(() => {
    if (selectedValue === "ทั้งหมด") return reports;
    return reports.filter(
      (r) => (filterType === "region" ? r.region === selectedValue : r.province === selectedValue)
    );
  }, [filterType, selectedValue, reports]);

  // PieChart data แยกตาม disease + severity
  const chartData = useMemo(() => {
    const countByDisease: Record<string, number> = {};
    filteredReports.forEach((r) => {
      countByDisease[r.disease_name] =
        (countByDisease[r.disease_name] || 0) + r.severity;
    });
    return Object.entries(countByDisease).map(([name, value]) => ({ name, value }));
  }, [filteredReports]);

  if (loading)
    return <p className="text-green-300 p-4 text-center">กำลังโหลดข้อมูล...</p>;
  if (error)
    return <p className="text-red-500 p-4 text-center">Error: {error}</p>;

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center space-y-8">
      {/* Header */}
      <Zoom>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400">
          สถิติโรคข้าว 📊
        </h1>
      </Zoom>

      {/* Filter */}
      <Slide direction="up" cascade damping={0.2}>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <select
            className="bg-zinc-800 border border-yellow-200 text-yellow-100 rounded-lg px-4 py-2 w-56"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value as "region" | "province");
              setSelectedValue("ทั้งหมด");
            }}
          >
            <option value="region">ตามภูมิภาค</option>
            <option value="province">ตามจังหวัด</option>
          </select>

          <select
            className="bg-zinc-800 border border-yellow-200 text-yellow-100 rounded-lg px-4 py-2 w-56"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {filterOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </Slide>

      {/* Pie Chart */}
      <div className="w-full h-80 bg-zinc-800 rounded-2xl shadow-lg p-6">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
              // label={(entry) => entry.name}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Map */}
      <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg border border-green-700">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={
              filteredReports.length > 0
                ? { lat: filteredReports[0].latitude, lng: filteredReports[0].longitude }
                : { lat: 15.0, lng: 100.0 }
            }
            zoom={6}
          >
            {filteredReports.map((r) => (
              <Marker
                key={r.id}
                position={{ lat: r.latitude, lng: r.longitude }}
                onClick={() => setSelectedReport(r)}
              />
            ))}

            {selectedReport && (
              <InfoWindow
                position={{ lat: selectedReport.latitude, lng: selectedReport.longitude }}
                onCloseClick={() => setSelectedReport(null)}
              >
                <div className="text-sm">
                  <strong className="text-green-400">{selectedReport.disease_name}</strong>
                  <br />
                  {selectedReport.province} ({selectedReport.region})
                  <br />
                  <span className="text-yellow-400">จำนวน: {selectedReport.severity}</span>
                  <br />
                  {selectedReport.image_path && (
                    <img
                      src={selectedReport.image_path}
                      alt="rice"
                      className="mt-1 w-32 h-32 object-cover rounded-md"
                    />
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <p className="p-4 text-green-300">กำลังโหลดแผนที่...</p>
        )}
      </div>
    </div>
  );
}
