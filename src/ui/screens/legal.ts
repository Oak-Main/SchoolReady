/**
 * The privacy and terms pages (legal kit v2, 2026-11-13).
 *
 * The privacy page renders the same Phase 10 policy as the Alerts and privacy
 * page (privacyBlock), plus who operates the site and the export/delete
 * controls the policy points to. Operator strings come from
 * config/brand.ts, the only file allowed to carry them.
 */
import { BRAND } from "../../../config/brand";
import { html } from "../html";
import { icon } from "../icons";
import { linkButton } from "../components/forms";
import type { Screen } from "../components/chrome";
import { LEGAL_PAGES as L } from "../copy/en";
import { EXPORT_FILE_NAME, privacyBlock } from "./account";

/** The date both pages took effect. Change it whenever either page changes. */
export const LEGAL_EFFECTIVE = "2026-11-13";

export function renderPrivacyPage(): Screen {
  const operator = html`<h2>${L.operatorTitle}</h2><p>${L.operatorBody(
    BRAND.name,
    BRAND.legalEntity,
    BRAND.legalAddress,
    BRAND.legalEmail,
  )}</p><p class="muted">${L.effective(LEGAL_EFFECTIVE)}</p>`;
  return {
    title: L.privacyTitle,
    description: L.privacyLead,
    activeNav: "privacy",
    container: "flow",
    sections: [
      { kind: "content", body: html`<h1>${L.privacyTitle}</h1><p class="lead">${L.privacyLead}</p>` },
      { kind: "content", body: operator },
      { kind: "content", body: privacyBlock() },
      {
        // The policy says the export and delete controls are below, so they
        // are: export downloads directly; delete is the one-pass form on
        // /account (kept in one place so there is a single purge entry point).
        kind: "content",
        body: html`<h2>${icon("download", { size: 20 })} ${L.controlsTitle}</h2><p>${L.controlsBody}</p><p>${linkButton(
          { label: L.controlsExportCta, href: "/api/export", variant: "secondary", icon: "download", download: EXPORT_FILE_NAME },
        )} ${linkButton({ label: L.controlsDeleteCta, href: "/account", variant: "secondary", icon: "trash-2" })}</p>`,
      },
    ],
  };
}

export function renderTermsPage(): Screen {
  const body = html`<p class="muted">${L.effective(LEGAL_EFFECTIVE)}</p>
<p>${L.termsLead(BRAND.name, BRAND.legalEntity)}</p>
<h2>${L.betaTitle}</h2><p>${L.betaBody}</p>
<h2>${L.infoTitle}</h2><p>${L.infoBody}</p>
<h2>${L.useTitle}</h2><p>${L.useBody}</p>
<h2>${L.linksTitle}</h2><p>${L.linksBody}</p>
<h2>${L.warrantyTitle}</h2><p>${L.warrantyBody(BRAND.legalEntity)}</p>
<h2>${L.lawTitle}</h2><p>${L.lawBody(BRAND.governingLaw, BRAND.legalEntity, BRAND.legalAddress, BRAND.legalEmail)}</p>
<h2>${L.changesTitle}</h2><p>${L.changesBody}</p>`;
  return {
    title: L.termsTitle,
    description: L.termsLead(BRAND.name, BRAND.legalEntity),
    activeNav: "terms",
    container: "flow",
    sections: [
      { kind: "content", body: html`<h1>${L.termsTitle}</h1>` },
      { kind: "content", body },
    ],
  };
}
