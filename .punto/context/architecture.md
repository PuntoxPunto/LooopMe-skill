---
id: loopme-skill-architecture
status: proposal
version: 1
updated: 2026-08-18
---

# LoopMe — Arquitectura

## Runtime

LoopMe V1 es un MCP remoto tool-only desplegado en AppDeploy.

```text
ChatGPT Web
  → LoopMe custom app/plugin
  → AppDeploy gateway
  → POST /api/mcp
  → loop_me
  → directiva de workflow design
  → estado permanece en la conversación
```

## Tool

`loop_me`

Comandos soportados:

```text
start
status
resume
export
stop
```

La tool es `noauth`, model-visible y `readOnlyHint: true`.

## Persistencia

V1 no tiene base de datos ni identidad de usuario propia. `structuredContent.persistence` devuelve `conversation`. La conversación actual es la única fuente de estado de sesión.

Esto es intencional: no se habilitará persistencia privada multiusuario hasta demostrar identidad OAuth de ChatGPT de punta a punta.

## Contrato MCP

La implementación usa el golden path ya probado por Punto por Punto:

- `server/discover` moderno `2026-07-28`;
- `initialize` legacy separado (`2025-11-25` fallback);
- headers `MCP-Protocol-Version`, `Mcp-Method` y `Mcp-Name` consistentes;
- `_meta["io.modelcontextprotocol/protocolVersion"]` para requests modernos;
- `resultType: complete` y server info en `_meta`;
- `GET /api/mcp` devuelve 405 intencional;
- `POST /api/mcp` ejecuta JSON-RPC.

## Deployment observado

- AppDeploy app id: `loopme-xkc1dm`;
- frontend diagnóstico: `https://loopme-xkc1dm.v2.appdeploy.ai/`;
- MCP gateway: `https://api-v2.appdeploy.ai/app/loopme-xkc1dm/api/mcp`;
- QA final: 3/3;
- backend endpoint coverage: 100%.

## Rename pendiente

El repositorio fue creado inicialmente como `PuntoxPunto/LooopMe-skill`. El `project_id` permanece correctamente estable como `loopme-skill`. Cuando GitHub sea renombrado a `PuntoxPunto/LoopMe-skill`, manifest y Registry deben reconciliar únicamente el path del repositorio.
