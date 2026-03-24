import { RE_VALID_FORMAT } from "./constants";
import type { DniResult, DocumentType, Validator } from "./types";
import { nifValidator } from "./validators/nif";
import { nieValidator } from "./validators/nie";
import { cifValidator } from "./validators/cif";
import { nieEspecialValidator } from "./validators/nie-especial";

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
  return validator?.validate(normalized) ?? { isValid: false, type: null, normalized };
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

