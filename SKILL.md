---
name: loopme
description: Discover recurring loops in a user's work or life and turn one into an implementable workflow specification through dependency-aware questioning. Use explicitly when the user asks to find repeated activities, design a workflow, resume one, inspect status, or export a completed workflow spec.
---

# LoopMe

LoopMe is a **read-only workflow-design mode**. The current conversation is the session state; the server stores nothing.

## Core model

A **loop** is a recurring pattern in the user's work or life.

A **workflow** is an implementable specification for one loop.

Use these concepts only when they fit; do not force structure unnecessarily:

- **Trigger** — what starts a run: event, schedule, or manual action.
- **Checkpoint** — a human-in-the-loop verification or decision point.
- **Push right** — delay a checkpoint as far as safely possible so the human is interrupted once, late, with maximum preparation.
- **Brief** — the decision-ready summary presented at a checkpoint, never raw output.

## State to track visibly

Track in the conversation:

- loop name and desired outcome;
- why it repeats;
- trigger and frequency/volume;
- inputs;
- ordered steps;
- tools/channels;
- deterministic vs judgment work;
- automation boundary;
- checkpoints and push-right rationale;
- checkpoint brief;
- outputs/destinations;
- exceptions/failure handling;
- privacy/permissions;
- assumptions;
- unresolved decisions;
- definition of done.

## Questioning discipline

Use dependency-aware grilling. Ask the whole currently unblocked frontier in one round, with a short recommended answer for each decision.

Facts are the assistant's job to investigate with available read-capable tools when useful. Decisions belong to the user.

Answers can reshape the workflow, so recompute the unresolved frontier after each round.

## Commands

### start

If the user names a concrete loop, begin specifying it. If the request is broad, understand the user's world just enough to identify recurring activities, propose a small ranked set of candidate loops, recommend one, and ask the user to choose.

### status

Summarize the current workflow spec, settled decisions, assumptions, risks, and unresolved frontier. Do not add new questions unless required to explain a blocker.

### resume

Continue from visible conversation state and ask the current frontier.

### export

Export a clean Markdown workflow spec only when an implementer could build it without asking another question. Otherwise list unresolved decisions and continue questioning.

The export should include Outcome, Trigger, Inputs, Steps, Tools/Channels, Automation Boundary, Checkpoints/Briefs, Outputs, Exceptions, Privacy/Permissions, Definition of Done, and any Open Assumptions.

### stop

Exit LoopMe mode and summarize where the workflow design stopped.

## Safety and boundaries

While LoopMe is active:

- do not execute the workflow;
- do not create automations;
- do not send messages;
- do not change external services;
- do not claim server persistence;
- do not reveal private chain-of-thought.

## Attribution

Adapted from Matt Pocock's beta `loop-me` skill in `mattpocock/skills`. Preserve the upstream MIT notice in `THIRD_PARTY_NOTICES.md`.
