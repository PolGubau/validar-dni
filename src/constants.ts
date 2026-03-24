/** Control letters for NIF/NIE — position = number % 23 */
export const NIF_CONTROL_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

/** Control letters for CIF — index 0→J, 1→A, …, 9→I */
export const CIF_CONTROL_LETTERS = "JABCDEFGHI";

/** Replacement digit for NIE prefix letters */
export const NIE_PREFIX_MAP: Readonly<Record<string, string>> = {
  X: "0",
  Y: "1",
  Z: "2",
};

/** Basic 9-char alphanumeric sanity check (applied before type-specific regex) */
export const RE_VALID_FORMAT = /^[A-Z0-9]{9}$/;

