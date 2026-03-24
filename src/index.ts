import type { DniResult, DocumentType } from "./types";

export type { DniResult, DocumentType };

const CONTROL_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";
const NIE_PREFIX_MAP: Record<string, string> = { X: "0", Y: "1", Z: "2" };

const RE_NIF = /^[0-9]{8}[A-Z]$/;
const RE_NIE = /^[XYZ][0-9]{7}[A-Z]$/;
const RE_CIF = /^[ABCDEFGHJNPQRSUVW][0-9]{7}[A-Z0-9]$/;
const RE_NIE_ESPECIAL = /^T[0-9]{8}$/;
const RE_VALID_FORMAT = /^[A-Z0-9]{9}$/;

function nifControl(digits: string): string {
  return CONTROL_LETTERS[parseInt(digits, 10) % 23];
}

function cifControl(dni: string): string {
  let sumaPar = 0;
  let sumaImpar = 0;

  for (let i = 1; i <= 6; i += 2) sumaPar += parseInt(dni[i], 10);
  for (let i = 0; i <= 6; i += 2) {
    const doble = parseInt(dni[i], 10) * 2;
    sumaImpar += doble > 9 ? doble - 9 : doble;
  }

  const control = (10 - ((sumaPar + sumaImpar) % 10)) % 10;
  return String.fromCharCode(64 + control); // returns letter; digit = control.toString()
}

/**
 * Parse a Spanish identifier and return rich metadata.
 *
 * @param dni - NIF, NIE or CIF string (case-insensitive)
 * @returns DniResult with validity, type and extra metadata
 */
export function parseDni(dni: string): DniResult {
  const normalized = dni.trim().toUpperCase();

  if (!RE_VALID_FORMAT.test(normalized)) {
    return { isValid: false, type: null, normalized };
  }

  // NIF (DNI) — 8 digits + 1 letter
  if (RE_NIF.test(normalized)) {
    const digits = normalized.slice(0, 8);
    const expectedControl = nifControl(digits);
    return {
      isValid: normalized[8] === expectedControl,
      type: "NIF",
      normalized,
      expectedControl,
    };
  }

  // NIE — X/Y/Z + 7 digits + letter
  if (RE_NIE.test(normalized)) {
    const digits = NIE_PREFIX_MAP[normalized[0]] + normalized.slice(1, 8);
    const expectedControl = nifControl(digits);
    return {
      isValid: normalized[8] === expectedControl,
      type: "NIE",
      normalized,
      expectedControl,
    };
  }

  // CIF — org letter + 7 digits + letter or digit
  if (RE_CIF.test(normalized)) {
    const controlChar = normalized[8];
    const expectedLetter = cifControl(normalized);
    const expectedDigit = ((10 - (([...normalized.slice(1, 8)].reduce((acc, c, i) => {
      const n = parseInt(c, 10);
      if (i % 2 === 0) { const d = n * 2; return acc + (d > 9 ? d - 9 : d); }
      return acc + n;
    }, 0)) % 10)) % 10).toString();

    const isLetter = /[A-Z]/.test(controlChar);
    const isValid = isLetter
      ? controlChar === expectedLetter
      : controlChar === expectedDigit;

    return {
      isValid,
      type: "CIF",
      normalized,
      expectedControl: isLetter ? expectedLetter : expectedDigit,
    };
  }

  // NIE especial — T + 8 digits (always valid if format matches)
  if (RE_NIE_ESPECIAL.test(normalized)) {
    return { isValid: true, type: "NIE_ESPECIAL", normalized };
  }

  return { isValid: false, type: null, normalized };
}

/**
 * Validate a Spanish DNI / NIE / CIF identifier.
 *
 * @param dni - Identifier string (case-insensitive)
 * @returns true if valid, false otherwise
 */
export function validDniCifNie(dni: string): boolean {
  return parseDni(dni).isValid;
}

