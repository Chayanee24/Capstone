import { useState, useEffect, useMemo } from "react"; 
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
import { API_URL } from "../../config/api";

type DiseaseReport = {
  id: number;
  province: string;
  region: string;
  disease_name: string;
  severity: number;
  latitude: number;
  longitude: number;
  image_path: string;
};

type TopProvince = {
  province: string;
  disease_name: string;
  total_cases: number;
};

const COLORS = [
  "#4ade80", "#2ce3ffff", "#facc15", "#f97316", "#f43f5e",   
  "#8b5cf6", "#06a086ff", "#10b981", "#23529cff", "#ec6482ff"
];

export default function Report() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDw7TcjDnnZxMpPZBXUMECRMSAkiwagkeY",
  });

  const [reports, setReports] = useState<DiseaseReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"region" | "province">("region");
  const [selectedValue, setSelectedValue] = useState<string>("ทั้งหมด");
  const [selectedReport, setSelectedReport] = useState<DiseaseReport | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${API_URL}/Statistic`);
        if (!res.ok) throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
        const json = await res.json();

        const data: DiseaseReport[] = json.data.flatMap((item: any) => {
          return item.DiseaseInformations.AnalysisResults.map((ar: any) => {
            const provName = item.Provinces.province_name;
            const regionName = item.Provinces.Region.region_name || "ไม่ระบุ";
            const coords = ar.RiceImages
              ? { lat: ar.RiceImages.latitude, lng: ar.RiceImages.longitude }
              : { lat: 15.0, lng: 100.0 };

            return {
              id: ar.id,
              province: provName,
              region: regionName,
              disease_name: ar.predicted_deficiency,
              severity: item.total_case || 1,
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
    return reports.filter((r) =>
      filterType === "region" ? r.region === selectedValue : r.province === selectedValue
    );
  }, [filterType, selectedValue, reports]);

  const chartData = useMemo(() => {
    const countByDisease: Record<string, number> = {};
    filteredReports.forEach((r) => {
      countByDisease[r.disease_name] =
        (countByDisease[r.disease_name] || 0) + r.severity;
    });
    return Object.entries(countByDisease).map(([name, value]) => ({ name, value }));
  }, [filteredReports]);

  const topProvinces: TopProvince[] = useMemo(() => {
    const provinceCount: Record<string, Record<string, number>> = {};
    filteredReports.forEach((r) => {
      if (!provinceCount[r.province]) provinceCount[r.province] = {};
      provinceCount[r.province][r.disease_name] =
        (provinceCount[r.province][r.disease_name] || 0) + r.severity;
    });

    const provinceArray: TopProvince[] = Object.entries(provinceCount).map(
      ([province, diseases]) => {
        const topDisease = Object.entries(diseases).reduce(
          (prev, curr) => (curr[1] > prev[1] ? curr : prev),
          ["", 0]
        );
        const totalCases = Object.values(diseases).reduce((a, b) => a + b, 0);
        return {
          province,
          disease_name: topDisease[0],
          total_cases: totalCases,
        };
      }
    );

    return provinceArray.sort((a, b) => b.total_cases - a.total_cases).slice(0, 5);
  }, [filteredReports]);

  if (loading)
    return <p className="text-green-300 p-4 text-center">กำลังโหลดข้อมูล...</p>;
  if (error)
    return <p className="text-red-500 p-4 text-center">Error: {error}</p>;

  return (
      <div className="w-full min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center space-y-8">

        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 text-center">
          สถิติโรคข้าว 📊
        </h1>

        <div className="relative w-full flex justify-center md:justify-start items-center gap-4">
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

        {/* Dashboard + Pie Chart */}
        <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Top 5 Provinces */}
          <div className="md:col-span-2 grid grid-cols-1 gap-4">
            {topProvinces.map((p) => (
              <div
                key={p.province}
                className="bg-zinc-800 p-4 rounded-xl shadow-lg border border-green-600 flex flex-col items-center"
              >
                <h3 className="text-yellow-400 font-bold text-center">{p.province}</h3>
                <p className="text-green-300 mt-1 text-center">โรคพบบ่อย: {p.disease_name}</p>
                <p className="text-white mt-2 text-lg font-semibold">{p.total_cases} ครั้ง</p>
              </div>
            ))}
          </div>

          {/* Pie Chart */}
          <div className="md:col-span-4 w-full h-80 bg-zinc-800 rounded-2xl shadow-lg p-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
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
        </div>

        {/* Google Map */}
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
