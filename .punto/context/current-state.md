---
id: loopme-skill-current-state
status: canonical
version: 2
updated: 2026-08-18
---

# LoopMe — Estado actual

## Estado funcional observado

LoopMe V1 está desplegado en AppDeploy y pasó su QA de hosting:

- app id: `loopme-xkc1dm`;
- deployment: `READY`;
- QA: `3/3 passed`;
- backend endpoint coverage: `100%`;
- herramienta model-visible: `loop_me`;
- modo: read-only;
- persistencia: `conversation` únicamente.

## Alcance V1

LoopMe descubre loops recurrentes, prioriza candidatos y especifica uno mediante dependency-aware grilling hasta que un implementador pueda construir el workflow sin otra pregunta.

V1 no crea automations, no ejecuta el workflow y no persiste datos privados server-side.

## Upstream

La adaptación toma como origen la skill beta `skills/in-progress/loop-me` de Matt Pocock. Se preservan atribución y MIT en `THIRD_PARTY_NOTICES.md`.

## Publicación canónica

- inicialización completa incorporada a `main` mediante PR #1;
- init merge SHA: `9224508420562810c44ab7527f74a597c08be97e`;
- `project_id: loopme-skill` registrado en `PuntoxPunto/Punto-x-Punto`;
- Registry PR #35;
- Registry merge SHA: `623fd5b98e54dd21d7a6fb1ec41afa74a0695270`;
- no se agregó ninguna relación cross-project implícita.

## Rename pendiente

El repo observado hoy es `PuntoxPunto/LooopMe-skill`. El usuario indicó que quitará la `o` adicional después. Hasta ese momento manifest y Registry reflejan deliberadamente el repositorio real; el identificador estable del proyecto es `loopme-skill`.

Después del rename a `PuntoxPunto/LoopMe-skill`, sólo hace falta reconciliar el campo `repository` del manifest, Registry y documentación que menciona el path anterior.
