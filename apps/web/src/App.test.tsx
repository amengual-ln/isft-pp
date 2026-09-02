import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { App } from "./App";

vi.mock("./api", () => ({
  getHealth: vi.fn().mockResolvedValue({ name: "SIGA-IT", version: "0.1.0", status: "ok" }),
}));

test("muestra que la API está conectada", async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );

  expect(await screen.findByText("API conectada")).toBeInTheDocument();
});
