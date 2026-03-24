# @polgubau/validar-dni

[![npm version](https://img.shields.io/npm/v/@polgubau/validar-dni?color=blue&label=npm)](https://www.npmjs.com/package/@polgubau/validar-dni)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@polgubau/validar-dni?label=minzip)](https://bundlephobia.com/package/@polgubau/validar-dni)
[![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/PolGubau/validar-dni)
[![license](https://img.shields.io/github/license/PolGubau/validar-dni)](./LICENSE)
[![CI](https://github.com/PolGubau/validar-dni/actions/workflows/publish.yml/badge.svg)](https://github.com/PolGubau/validar-dni/actions)

Lightweight TypeScript library to validate Spanish **DNI (NIF)**, **NIE** and **CIF** identifiers.

- ✅ Zero dependencies
- ✅ ESM + CJS — works in Node, browsers, React, Next.js, Deno…
- ✅ Full TypeScript types
- ✅ 100% branch coverage
- ✅ Tree-shakeable subpath exports

---

## Installation

```bash
npm install @polgubau/validar-dni
# or
pnpm add @polgubau/validar-dni
# or
yarn add @polgubau/validar-dni
```

---

## Quick start

```ts
import { validDniCifNie, parseDni } from "@polgubau/validar-dni";

// Boolean check
validDniCifNie("12345678Z"); // true
validDniCifNie("12345678A"); // false  ← wrong letter

// Rich result
parseDni("12345678A");
// {
//   isValid: false,
//   type: "NIF",
//   normalized: "12345678A",
//   expectedControl: "Z"   ← tells you the correct letter
// }
```

---

## API

### `validDniCifNie(input: string): boolean`

Returns `true` if the identifier is valid, `false` otherwise. Case-insensitive, trims whitespace.

```ts
validDniCifNie("12345678Z"); // true  — valid NIF
validDniCifNie("X1234567L"); // true  — valid NIE
validDniCifNie("A58818501"); // true  — valid CIF
validDniCifNie("T12345678"); // true  — valid NIE especial
validDniCifNie("12345678A"); // false — wrong control letter
```

### `parseDni(input: string): DniResult`

Returns a `DniResult` object with full metadata.

```ts
interface DniResult {
  isValid: boolean;           // whether the identifier is valid
  type: DocumentType | null;  // "NIF" | "NIE" | "CIF" | "NIE_ESPECIAL" | null
  normalized: string;         // uppercased, trimmed input
  expectedControl?: string;   // correct letter or digit (NIF, NIE, CIF)
}
```

```ts
parseDni("X1234567L");
// { isValid: true, type: "NIE", normalized: "X1234567L", expectedControl: "L" }

parseDni("A5881850A");
// { isValid: true, type: "CIF", normalized: "A5881850A", expectedControl: "A" }

parseDni("INVALID!!");
// { isValid: false, type: null, normalized: "INVALID!!" }
```

---

## Document types

| Type | Format | Example |
|------|--------|---------|
| **NIF** (DNI) | 8 digits + 1 letter | `12345678Z` |
| **NIE** | X/Y/Z + 7 digits + letter | `X1234567L` |
| **CIF** | Org letter + 7 digits + letter or digit | `A58818501` |
| **NIE especial** | T + 8 digits | `T12345678` |

### CIF org letter

| Letter | Entity type |
|--------|-------------|
| A | Sociedad Anónima |
| B | Sociedad de Responsabilidad Limitada |
| C | Sociedad Colectiva |
| E | Comunidad de Bienes |
| G | Asociación |
| H | Comunidad de Propietarios |
| N | Entidad extranjera |
| P | Corporación Local |
| Q | Organismo público |
| R | Congregación religiosa |
| S | Órgano de la Administración del Estado |
| W | Establecimiento permanente de entidad no residente |

---

## Tree-shaking — subpath exports

Import only the validator you need:

```ts
import { nifValidator } from "@polgubau/validar-dni/nif";
import { nieValidator } from "@polgubau/validar-dni/nie";
import { cifValidator } from "@polgubau/validar-dni/cif";

nifValidator.matches("12345678Z"); // true
nifValidator.validate("12345678Z");
// { isValid: true, type: "NIF", normalized: "12345678Z", expectedControl: "Z" }
```

Each subpath is **~115 bytes** minified vs ~1 KB for the full bundle.

---

## License

MIT © [Pol Gubau Amores](https://github.com/PolGubau)

This library is free to use, modify and distribute. **Attribution is required** — you must keep the copyright notice in any copy or substantial portion of the software (the MIT license handles this automatically).

---

## Contributing

```bash
npm install
npm test          # run tests
npm run check     # lint + format check (Biome)
npm run check:fix # auto-fix
npm run build     # compile to dist/
```

