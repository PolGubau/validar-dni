export type DocumentType = "NIF" | "NIE" | "CIF" | "NIE_ESPECIAL";

export interface DniResult {
  /** Whether the identifier is valid */
  isValid: boolean;
  /** Detected document type, null if format is unrecognized */
  type: DocumentType | null;
  /** Normalized (uppercased, trimmed) input */
  normalized: string;
  /** Expected control character (letter or digit). Only present for NIF and NIE */
  expectedControl?: string;
}

