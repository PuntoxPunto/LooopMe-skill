# LoopMe

LoopMe is a read-only ChatGPT Web MCP adaptation for discovering recurring loops in work or life and turning one loop into an implementable workflow specification.

> **Origin and thanks:** LoopMe is inspired by and adapted from Matt Pocock's beta `loop-me` skill in [`mattpocock/skills`](https://github.com/mattpocock/skills/tree/main/skills/in-progress/loop-me). The upstream concepts of **Loop, Workflow, Trigger, Checkpoint, Push right, Brief**, and the definition of done come from that work. See `THIRD_PARTY_NOTICES.md` for the preserved MIT notice.

## What it does

LoopMe helps a user:

- identify recurring activities worth delegating or systematizing;
- prioritize loops by frequency, value, delegability, and risk;
- specify one workflow through dependency-aware questioning;
- define trigger, inputs, steps, automation boundaries, checkpoints, briefs, outputs, exceptions, privacy constraints, and definition of done;
- export a portable Markdown workflow spec only when an implementer could build it without another question.

## V1 boundaries

LoopMe V1 is deliberately conservative:

- read-only;
- no authentication required;
- no server-side persistence;
- conversation state only;
- no scheduling or automation creation;
- no email/message sending;
- no external service mutations.

## MCP

AppDeploy app id:

```text
loopme-xkc1dm
```

Frontend diagnostic:

```text
https://loopme-xkc1dm.v2.appdeploy.ai/
```

ChatGPT MCP registration URL:

```text
https://api-v2.appdeploy.ai/app/loopme-xkc1dm/api/mcp
```

Register it in ChatGPT Developer Mode as **LoopMe**, using **Server URL** and **No authentication**.

Example:

```text
@LoopMe

Todos los lunes reviso Gmail, calendario, GitHub y pendientes para planificar mi semana. Quiero convertir eso en un workflow.
```

## Tool

`loop_me`

Commands:

```text
start
status
resume
export
stop
```

## Deployment evidence

The deployed V1 reached:

- AppDeploy status: `READY`;
- QA: `3/3 passed`;
- backend endpoint coverage: `100%`.

## Repository naming note

The GitHub repository was initially created as `PuntoxPunto/LooopMe-skill` with an extra `o`. The canonical project id is already `loopme-skill`. After the repository is renamed to `PuntoxPunto/LoopMe-skill`, the Project Pack and Punto por Punto Registry should receive a small repository-path reconciliation.
