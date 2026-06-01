# PersonaMirror369 v1.9.0 Feature Freeze

**Status:** Frozen for v2.0.0 release preparation  
**Freeze date:** 2026-05-31  
**Target release:** v2.0.0 Zenodo DOI release

## Freeze Decision

PersonaMirror369 has entered feature freeze after the v1.9.0 release-candidate build passed GitHub Actions and the live GitHub Pages app was manually clicked through successfully.

No new major modules should be added before v2.0.0.

## Allowed Changes Before v2.0.0

Only the following changes should be made during freeze:

- build fixes;
- broken link fixes;
- typo or clarity fixes;
- release-note edits;
- Zenodo metadata edits;
- citation metadata edits;
- claim-boundary corrections;
- accessibility or critical usability fixes;
- README/CHANGELOG release prep;
- DOI badge/link patch after Zenodo publication.

## Not Allowed Before v2.0.0

Avoid adding:

- new app modules;
- new formulas;
- new localStorage schemas unless required by a bug fix;
- major layout rewrites;
- new conceptual claims;
- experimental features;
- scope expansions.

## Current Release Path

```txt
v1.9.0 release candidate
→ feature freeze
→ final release notes and metadata pass
→ GitHub Release v2.0.0
→ Zenodo archive
→ DOI minted
→ post-release README/CITATION DOI patch
```

## Current Validation State

- GitHub Actions build: green
- GitHub Pages deploy: green
- Live app click-through: passed
- Feature status: frozen

## Boundary Reminder

PersonaMirror369 remains a reflection and education tool. It is not therapy, diagnosis, clinical screening, surveillance, social scoring, or proof of a universal model of human behavior.
