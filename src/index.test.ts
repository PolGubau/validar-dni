import { describe, expect, it } from "vitest";
import { parseDni, validDniCifNie } from "./index";

describe("validDniCifNie", () => {
  it("accepts a valid NIF", () => expect(validDniCifNie("12345678Z")).toBe(true));
  it("accepts a valid NIF", () => expect(validDniCifNie("39959968K")).toBe(true));
  it("rejects a NIF with wrong letter", () => expect(validDniCifNie("12345678A")).toBe(false));
  it("accepts a valid NIE (X prefix)", () => expect(validDniCifNie("X1234567L")).toBe(true));
  it("accepts a valid NIE (Y prefix)", () => expect(validDniCifNie("Y1234567X")).toBe(true));
  it("rejects a NIE with wrong letter", () => expect(validDniCifNie("X1234567A")).toBe(false));
  it("accepts a valid CIF", () => expect(validDniCifNie("A58818501")).toBe(true));
  it("rejects a CIF with wrong control", () => expect(validDniCifNie("A58818502")).toBe(false));
  it("accepts a NIE especial (T prefix)", () => expect(validDniCifNie("T12345678")).toBe(true));
  it("rejects an empty string", () => expect(validDniCifNie("")).toBe(false));
  it("rejects a too-short string", () => expect(validDniCifNie("1234")).toBe(false));
  it("is case-insensitive", () => expect(validDniCifNie("12345678z")).toBe(true));
});

describe("parseDni", () => {
  it("returns NIF type and expectedControl for valid NIF", () => {
    const result = parseDni("12345678Z");
    expect(result).toEqual({
      isValid: true,
      type: "NIF",
      normalized: "12345678Z",
      expectedControl: "Z",
    });
  });

  it("returns expectedControl even for invalid NIF", () => {
    const result = parseDni("12345678A");
    expect(result.isValid).toBe(false);
    expect(result.type).toBe("NIF");
    expect(result.expectedControl).toBe("Z");
  });

  it("returns NIE type for valid NIE", () => {
    const result = parseDni("X1234567L");
    expect(result.isValid).toBe(true);
    expect(result.type).toBe("NIE");
    expect(result.expectedControl).toBe("L");
  });

  it("returns CIF type for valid CIF", () => {
    const result = parseDni("A58818501");
    expect(result.isValid).toBe(true);
    expect(result.type).toBe("CIF");
  });

  it("returns NIE_ESPECIAL type for T-prefix NIE", () => {
    const result = parseDni("T12345678");
    expect(result.isValid).toBe(true);
    expect(result.type).toBe("NIE_ESPECIAL");
  });

  it("returns null type for unrecognized format", () => {
    const result = parseDni("INVALID!!");
    expect(result.isValid).toBe(false);
    expect(result.type).toBeNull();
  });

  it("normalizes lowercase input", () => {
    const result = parseDni("12345678z");
    expect(result.normalized).toBe("12345678Z");
    expect(result.isValid).toBe(true);
  });

  it("trims whitespace before validating", () => {
    expect(parseDni("  12345678Z  ").isValid).toBe(true);
  });
});
