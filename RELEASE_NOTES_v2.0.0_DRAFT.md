# PersonaMirror369 v2.0.0 — Draft Release Notes

**Status:** Draft release notes for the planned Zenodo DOI release.  
**Current release-candidate track:** v1.9.x  
**Target citable release:** v2.0.0

## Summary

PersonaMirror369 is a humane, local-first reflection application for exploring the everyday masks people wear, the rooms and pressures that shape those masks, and gentle practices for safer truth, personal continuity, and consent-centered self-reflection.

The v2.0.0 release is intended to be the first citable Zenodo release of the project.

## Included System Modules

- Launch Compass
- Public Share Kit
- Local Trust Check
- Local Data / Continuity Center
- Offline Ready PWA Shell
- Daily Mirror Deck
- Local Mirror Journal
- Local Insights Dashboard
- Gentle Integration Planner
- Consent Language Builder
- Guided Practice Mode
- Pretending Force Meter
- Mask Load Calculator
- Frontstage / Backstage Map
- Safe Truth Planner
- Group Pretending Simulator
- Anti-Manipulation Mode
- Local Reflection Report / Vault
- Mask Atlas

## Local-First Design

PersonaMirror369 is designed so that user-generated reflections, journal entries, integration plans, saved language, and report drafts remain in browser-local storage unless the user chooses to copy or export them.

The app includes user-facing controls to:

- view known local storage keys;
- export a local continuity backup;
- import a backup;
- clear individual module data;
- clear all known local module data;
- clear PersonaMirror369 app-shell caches.

## Claim Boundaries

PersonaMirror369 is a reflection and education tool. It is not:

- a diagnosis tool;
- a therapy replacement;
- a clinical instrument;
- a surveillance system;
- a social scoring system;
- a lie detector;
- a coercive persuasion tool;
- proof of a universal psychological model.

## Technical Stack

- React
- TypeScript
- Vite
- GitHub Pages
- Browser localStorage
- Browser Cache API / service worker app shell

## Citation

After the v2.0.0 GitHub release is archived with Zenodo, cite the Zenodo DOI generated for that release.

## Release Checklist Before v2.0.0

- Confirm `npm run build` passes.
- Confirm GitHub Pages deployment is green.
- Confirm live app loads after cache refresh.
- Confirm Zenodo metadata is accurate.
- Confirm license is correct.
- Confirm release notes are finalized.
- Tag GitHub release `v2.0.0`.
- Archive release through Zenodo.
- Add DOI badge/link back to README after DOI is minted.
