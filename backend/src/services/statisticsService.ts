import supabase from "./supabase"
import fetch from "node-fetch"

type NominatimResponse = {
  address?: {
    state?: string
    county?: string
    city?: string
    town?: string
    village?: string
    province?: string
  }
}

export const updateDiseaseStatisticService = async (
  diseaseName: string,
  latitude: number,
  longitude: number
) => {
  if (!diseaseName || !latitude || !longitude) {
    throw new Error("Missing required fields")
  }

  const currentYear = new Date().getFullYear()

  // 📌 province จาก Nominatim
  const geoResponse = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=7&addressdetails=1`,
    { headers: { "User-Agent": "my-app" } }
  )
  const geoData = (await geoResponse.json()) as NominatimResponse
  // ✅ ใช้ state เป็นหลัก (คือจังหวัด)
  let province = geoData.address?.province || "Unknown"
  if (province.startsWith("จังหวัด")) {
    province = province.replace("จังหวัด", "").trim()
  }
  //console.log("Full Nominatim response:", geoData)
  //console.log(province)

  // 📌 หา disease_id
  const { data: disease, error: diseaseError } = await supabase
    .from("DiseaseInformations")
    .select("id")
    .eq("disease_name", diseaseName)
    .single()

  if (diseaseError || !disease) throw new Error("Disease not found")

  // 📌 หา province_id
  const { data: provinceRow, error: provinceError } = await supabase
    .from("Provinces")
    .select("id")
    .eq("province_name", province)
    .single()

  if (provinceError || !provinceRow) throw new Error("Province not found")

  const disease_id = disease.id
  const province_id = provinceRow.id

  // 📌 เช็คว่ามีข้อมูลของปีนี้อยู่แล้วหรือยัง
  const { data: stat } = await supabase
    .from("DiseaseStatistics")
    .select("id, total_case")
    .eq("disease_id", disease_id)
    .eq("province_id", province_id)
    .eq("year", currentYear)
    .maybeSingle()

  if (stat) {
    // ✅ update
    const { data, error } = await supabase
      .from("DiseaseStatistics")
      .update({
        total_case: stat.total_case + 1,
        updated_at: new Date(),
      })
      .eq("id", stat.id)
      .select()

    if (error) throw new Error(error.message)
    return { message: "Statistic updated successfully", data }
  } else {
    // ✅ insert
    const { data, error } = await supabase
      .from("DiseaseStatistics")
      .insert({
        disease_id,
        province_id,
        year: currentYear,
        total_case: 1,
        updated_at: new Date(),
      })
      .select()

    if (error) throw new Error(error.message)
    return { message: "Statistic inserted successfully", data }
  }
}

export const getAllStatisticsService = async () => {
    const { data, error } = await supabase
  .from("DiseaseStatistics")
  .select(`
    id,
    total_case,
    year,
    updated_at,
    DiseaseInformations (
      id,
      disease_name,
      AnalysisResults (
        id,
        predicted_deficiency,
        RiceImages (
          id,
          image_path,
          latitude,
          longitude,
          created_at
        )
      )
    ),
    Provinces (
      id,
      province_name,
      Region (
        id,
        region_name
      )
    )
  `)
  .order("year", { ascending: false })
  .order("updated_at", { ascending: false })
  
    if (error) throw new Error(error.message)
    return data
}
  
