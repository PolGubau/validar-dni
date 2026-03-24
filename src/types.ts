export type DocumentType = "NIF" | "NIE" | "CIF" | "NIE_ESPECIAL";

export interface DniResult {
  /** Whether the identifier is valid */
  isValid: boolean;
  /** Detected document type, null if format is unrecognized */
  type: DocumentType | null;
  /** Normalized (uppercased, trimmed) input */
  normalized: string;
  /** Expected control character (letter or digit). Present for NIF, NIE and CIF */
  expectedControl?: string;
}

/** Contract every document-type validator must satisfy */
export interface Validator {
  matches(normalized: string): boolean;
  validate(normalized: string): DniResult;
}

