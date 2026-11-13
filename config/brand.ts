/**
 * §0 Brand isolation. The working name is disposable — assume it changes once.
 *
 * This file is the ONLY place the brand name, wordmark, domain, and legal
 * entity strings may appear. Nothing else in the codebase hardcodes them;
 * everything references this module. Enforced by tests/config.test.ts
 * ("brand isolation" suite), which scans source directories for the literal.
 *
 * Domain updated 2026-08-04: real domain purchased through Cloudflare
 * Registrar per repository-owner instruction (docs/release/
 * backtoacademy-launch-runbook.md). Name/wordmark set to match. legalEntity
 * was UNSET until 2026-11-13, when the repository owner's operating company
 * (Oak and Main Developers LLC, the entity on every site in the portfolio's
 * legal kit v2) was supplied; launch-checklist item 1's entity half is
 * discharged.
 */
export const BRAND = {
  /** Working name. Disposable. */
  name: "Back to Academy",
  /** Wordmark string as rendered in the UI shell (Phase 7 replaces with the real mark). */
  wordmark: "Back to Academy",
  domain: "backtoacademy.com",
  /** The operating company (owner-supplied, legal kit v2, 2026-11-13). */
  legalEntity: "Oak and Main Developers LLC",
  /** Its postal address, printed on the privacy and terms pages. */
  legalAddress: "1223 Cleveland Ave, Suite 200, San Diego, CA 92103",
  /** The legal contact on the privacy and terms pages. */
  legalEmail: "admin@oakandmain.dev",
  /** Law that governs the terms (legal kit v2). */
  governingLaw: "California, USA",
  supportEmail: "support@backtoacademy.com",
} as const;

export type Brand = typeof BRAND;
