/**
 * Legal kit v2 (2026-11-13): the prerendered /privacy and /terms pages.
 * The worker route is covered in tests-workers/seo-pages.test.ts; this
 * proves the static build emits both pages with the operator strings from
 * config/brand.ts, the effective date, and the controls the policy promises.
 */
import { describe, expect, it } from "vitest";
import { BRAND } from "../config/brand";
import { escapeHtml } from "../src/ui/html";
import { LEGAL_EFFECTIVE } from "../src/ui/screens/legal";
import { staticPages } from "../src/ui/static-site";

const byPath = new Map(staticPages().map((p) => [p.path, p.html]));

describe("prerendered legal pages", () => {
  for (const file of ["privacy/index.html", "terms/index.html"]) {
    it(`${file} is emitted with the operator and effective date`, () => {
      const html = byPath.get(file);
      expect(html, `${file} missing from staticPages()`).toBeDefined();
      expect(html).toMatch(/^<!doctype html>/);
      expect(html).toContain(escapeHtml(BRAND.legalEntity));
      expect(html).toContain(escapeHtml(BRAND.legalEmail));
      expect(html).toContain(`Effective ${LEGAL_EFFECTIVE}.`);
    });
  }

  it("privacy/index.html carries the export link and the delete pointer", () => {
    const html = byPath.get("privacy/index.html")!;
    expect(html).toContain(escapeHtml(BRAND.legalAddress));
    expect(html).toContain('href="/api/export"');
    expect(html).toContain('href="/account"');
  });

  it("terms/index.html states the governing law", () => {
    expect(byPath.get("terms/index.html")).toContain(
      escapeHtml(`governed by the laws of ${BRAND.governingLaw}`),
    );
  });
});

describe("export links save a file, as their labels say", () => {
  it("the /privacy export link carries the download attribute", () => {
    expect(byPath.get("privacy/index.html")).toMatch(/href="\/api\/export" download="[^"]+\.json"/);
  });
});
