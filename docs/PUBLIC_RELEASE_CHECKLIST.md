# PersonaMirror369 Public Release Checklist

This checklist is for the planned v2.0.0 Zenodo DOI release.

## Freeze Status

- [x] v1.9.0 feature freeze declared.
- [x] GitHub Actions build is green.
- [x] GitHub Pages deploy is green.
- [x] Live app click-through passed.
- [ ] No new features added before v2.0.0.

See: `docs/FEATURE_FREEZE_v1.9.0.md`

## Repository Readiness

- [ ] README is current.
- [ ] CHANGELOG is current.
- [ ] LICENSE is present and correct.
- [ ] Zenodo metadata is present and accurate.
- [ ] Claim boundaries document is present.
- [ ] Draft v2.0.0 release notes are finalized.
- [ ] Citation instructions are clear.

## Build Readiness

- [x] GitHub Actions build is green.
- [x] GitHub Pages deploy is green.
- [x] Live app loads at the configured Pages URL.
- [ ] Service worker cache refresh behavior has been checked.

## App Readiness

- [x] Launch Compass is visible.
- [x] Public Share Kit is visible.
- [x] Local Trust Check is visible.
- [x] Local Continuity Center is visible.
- [x] Daily Mirror Deck works.
- [x] Local Mirror Journal saves locally.
- [x] Local Insights Dashboard reads local journal entries.
- [x] Gentle Integration Planner saves and exports.
- [x] Consent Language Builder saves and exports.
- [x] Local Reflection Vault exports and imports.

## Boundary Readiness

- [ ] The app does not present itself as therapy.
- [ ] The app does not present itself as diagnosis.
- [ ] The app does not claim scientific validation of formulas.
- [ ] The app does not encourage forced disclosure.
- [ ] The app does not encourage profiling people without consent.
- [ ] The app clearly states local-first boundaries.

## Zenodo Release Steps

- [ ] Create GitHub release tag `v2.0.0`.
- [ ] Confirm Zenodo archive is created from the GitHub release.
- [ ] Confirm Zenodo metadata.
- [ ] Publish Zenodo release.
- [ ] Copy DOI.
- [ ] Add DOI badge/link to README after publication.
- [ ] Announce using the Public Share Kit.
