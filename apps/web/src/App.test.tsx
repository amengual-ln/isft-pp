import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { App } from "./App";

vi.mock("./api", () => ({
  getHealth: vi.fn().mockResolvedValue({ name: "SIGA-IT", version: "0.1.0", status: "ok" }),
}));

vi.stubGlobal("scrollTo", vi.fn());

test("permite consultar mesas y confirmar una inscripción fake", async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );

  expect(screen.getByRole("heading", { name: "Hola, Sofía" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Mesas de examen" }));
  fireEvent.click(screen.getByRole("button", { name: "Inscribirme a Programación II" }));

  expect(screen.getByRole("status")).toHaveTextContent("Inscripción confirmada");
  expect(screen.getByRole("button", { name: "Ya estás inscripta a Programación II" })).toBeDisabled();
});
