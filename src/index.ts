import { RE_VALID_FORMAT } from "./constants";
import type { DniResult, DocumentType, Validator } from "./types";
import { cifValidator } from "./validators/cif";
import { nieValidator } from "./validators/nie";
import { nieEspecialValidator } from "./validators/nie-especial";
import { nifValidator } from "./validators/nif";

export type { DniResult, DocumentType, Validator };

const VALIDATORS: readonly Validator[] = [
  nifValidator,
  nieValidator,
  cifValidator,
  nieEspecialValidator,
];

function normalize(input: string): string {
  return input.trim().toUpperCase();
}

/**
 * Parse a Spanish identifier and return rich metadata.
 *
 * @param input - NIF, NIE or CIF string (case-insensitive)
 * @returns DniResult with validity, type and control metadata
 */
export function parseDni(input: string): DniResult {
  const normalized = normalize(input);

  if (!RE_VALID_FORMAT.test(normalized)) {
    return { isValid: false, type: null, normalized };
  }

  const validator = VALIDATORS.find((v) => v.matches(normalized));

  if (!validator) {
    return { isValid: false, type: null, normalized };
  }
  // v8 ignore next — defensive fallback; all 9-char patterns are covered by VALIDATORS
  return validator.validate(normalized);
}

/**
 * Validate a Spanish DNI / NIE / CIF identifier.
 *
 * @param input - Identifier string (case-insensitive)
 * @returns true if valid, false otherwise
 */
export function validDniCifNie(input: string): boolean {
  return parseDni(input).isValid;
}
