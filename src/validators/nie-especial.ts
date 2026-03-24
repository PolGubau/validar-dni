import type { DniResult, Validator } from "../types";

const RE_NIE_ESPECIAL = /^T[0-9]{8}$/;

export const nieEspecialValidator: Validator = {
  matches: (s) => RE_NIE_ESPECIAL.test(s),

  validate: (normalized): DniResult => ({
    isValid: true,
    type: "NIE_ESPECIAL",
    normalized,
  }),
};
