---
id: loopme-skill-identity
status: canonical
version: 2
updated: 2026-08-18
---

# LoopMe — Identidad

LoopMe es una capability MCP remota de Punto por Punto para ChatGPT Web. Su función es descubrir loops recurrentes en el trabajo o la vida del usuario y convertir uno en una especificación de workflow implementable mediante preguntas ordenadas por dependencia.

## Límites

- read-only durante el diseño;
- no ejecuta workflows;
- no crea automations;
- no envía mensajes ni modifica servicios externos;
- no requiere autenticación propia en V1;
- no persiste datos server-side;
- usa la conversación visible como estado de sesión;
- exporta un workflow portable sólo cuando un implementador podría construirlo sin otra pregunta.

## Origen

Adaptación de la skill beta `loop-me` de Matt Pocock en `mattpocock/skills`, preservando atribución y aviso MIT. La adaptación Punto por Punto añade el transporte MCP remoto compatible con ChatGPT Web y el modelo stateless/conversation-state.

## Estado canónico

El Project Pack fue incorporado a `main` mediante PR #1 y el proyecto fue registrado en `PuntoxPunto/Punto-x-Punto` mediante Registry PR #35.
