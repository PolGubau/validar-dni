import { NIE_PREFIX_MAP, NIF_CONTROL_LETTERS } from "../constants";
import type { DniResult, Validator } from "../types";

const RE_NIE = /^[XYZ][0-9]{7}[A-Z]$/;

function computeControl(normalized: string): string {
  const digits = NIE_PREFIX_MAP[normalized[0]] + normalized.slice(1, 8);
  return NIF_CONTROL_LETTERS[parseInt(digits, 10) % 23];
}

export const nieValidator: Validator = {
  matches: (s) => RE_NIE.test(s),

  validate: (normalized): DniResult => {
    const expectedControl = computeControl(normalized);
    return {
      isValid: normalized[8] === expectedControl,
      type: "NIE",
      normalized,
      expectedControl,
    };
  },
};
