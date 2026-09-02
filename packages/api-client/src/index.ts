import createClient from "openapi-fetch";

import type { components, paths } from "./schema";

export type Health = components["schemas"]["HealthResponse"];

export function createApiClient(baseUrl: string) {
  return createClient<paths>({ baseUrl });
}
