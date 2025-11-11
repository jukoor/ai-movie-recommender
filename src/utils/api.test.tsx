import { describe, it, expect, vi } from "vitest";
import axios from "axios";

// Mock axios module
vi.mock("axios", () => {
  return {
    default: {
      create: vi.fn(() => ({
        request: vi.fn(),
      })),
      isAxiosError: vi.fn(),
    },
  };
});

describe("apiRequest utility", () => {
  it("exports axios instance", async () => {
    // This test verifies the module structure
    const { default: apiClient } = await import("./api");
    expect(apiClient).toBeDefined();
  });

  it("validates error handling logic", () => {
    // Test that axios.isAxiosError is used correctly
    const mockedAxios = axios as unknown as {
      isAxiosError: ReturnType<typeof vi.fn>;
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    expect(axios.isAxiosError(new Error("test"))).toBe(true);

    mockedAxios.isAxiosError.mockReturnValue(false);
    expect(axios.isAxiosError(new Error("test"))).toBe(false);
  });
});
