import { NIF_CONTROL_LETTERS } from "../constants";
import type { DniResult, Validator } from "../types";

const RE_NIF = /^[0-9]{8}[A-Z]$/;

function computeControl(digits: string): string {
  return NIF_CONTROL_LETTERS[parseInt(digits, 10) % 23];
}

export const nifValidator: Validator = {
  matches: (s) => RE_NIF.test(s),

  validate: (normalized): DniResult => {
    const expectedControl = computeControl(normalized.slice(0, 8));
    return {
      isValid: normalized[8] === expectedControl,
      type: "NIF",
      normalized,
      expectedControl,
    };
  },
};
