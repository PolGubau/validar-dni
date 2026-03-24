import { CIF_CONTROL_LETTERS } from "../constants";
import type { DniResult, Validator } from "../types";

const RE_CIF = /^[ABCDEFGHJNPQRSUVW][0-9]{7}[A-Z0-9]$/;
const RE_LETTER = /[A-Z]/;

function computeControlChars(s: string): { letter: string; digit: string } {
  let sumEven = 0;   // positions 3,5,7 of the full id (0-based: 2,4,6)
  let sumOdd = 0;    // positions 2,4,6,8 of the full id (0-based: 1,3,5,7), Luhn-doubled

  for (let i = 2; i <= 6; i += 2) sumEven += parseInt(s[i], 10);
  for (let i = 1; i <= 7; i += 2) {
    const doubled = parseInt(s[i], 10) * 2;
    sumOdd += doubled > 9 ? doubled - 9 : doubled;
  }

  const control = (10 - ((sumEven + sumOdd) % 10)) % 10;
  return { letter: CIF_CONTROL_LETTERS[control], digit: control.toString() };
}

export const cifValidator: Validator = {
  matches: (s) => RE_CIF.test(s),

  validate: (normalized): DniResult => {
    const controlChar = normalized[8];
    const { letter, digit } = computeControlChars(normalized);
    const isLetter = RE_LETTER.test(controlChar);
    const expectedControl = isLetter ? letter : digit;

    return {
      isValid: controlChar === expectedControl,
      type: "CIF",
      normalized,
      expectedControl,
    };
  },
};

