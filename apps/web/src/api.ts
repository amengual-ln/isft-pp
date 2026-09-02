import { createApiClient, type Health } from "@isft-pp/api-client";

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";
const client = createApiClient(baseUrl);

export async function getHealth(): Promise<Health> {
  const { data, error } = await client.GET("/api/v1/health");

  if (error || !data) {
    throw new Error("No se pudo conectar con la API");
  }

  return data;
}
