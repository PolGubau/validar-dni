# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-24

### Added
- `validDniCifNie(input)` — boolean validator for NIF, NIE and CIF
- `parseDni(input)` — rich parser returning `DniResult` with type, validity and expected control character
- Subpath exports: `validar-dni/nif`, `validar-dni/nie`, `validar-dni/cif`
- Dual ESM/CJS build with full TypeScript declarations
- 100% branch coverage

