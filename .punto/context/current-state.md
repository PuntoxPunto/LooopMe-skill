---
id: loopme-skill-current-state
status: proposal
version: 1
updated: 2026-08-18
---

# LoopMe — Estado actual

## Estado funcional observado

LoopMe V1 ya está desplegado en AppDeploy y pasó su QA de hosting:

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

Esta branch propone incorporar:

- source reproducible del MCP;
- companion `SKILL.md`;
- diagnóstico/frontend mínimo;
- QA;
- documentación de registro;
- Project Pack v1.

El proyecto todavía no debe considerarse canónico hasta que este Project Pack se incorpore a `main` y luego se registre desde ese `main` en `PuntoxPunto/Punto-x-Punto`.

## Rename pendiente

El repo observado hoy es `PuntoxPunto/LooopMe-skill`. El usuario indicó que quitará la `o` adicional después. Hasta ese momento el manifest debe reflejar el repositorio real; el identificador estable del proyecto es `loopme-skill`.
