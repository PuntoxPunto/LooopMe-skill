# ChatGPT Web setup

Register the deployed LoopMe MCP as a custom app/plugin in ChatGPT Developer Mode.

## Connection

Name:

```text
LoopMe
```

Connection type:

```text
Server URL
```

Authentication:

```text
No authentication
```

MCP URL:

```text
https://api-v2.appdeploy.ai/app/loopme-xkc1dm/api/mcp
```

After creating the app, open a new normal ChatGPT conversation, select LoopMe from Tools/Apps or mention it with `@LoopMe`, then invoke a workflow-design request.

Example:

```text
@LoopMe

Quiero detectar qué actividades repetitivas de mi trabajo podrían convertirse en workflows.
```

## Diagnostic frontend

```text
https://loopme-xkc1dm.v2.appdeploy.ai/
```

The frontend is diagnostic only. It is not the MCP registration URL.

## Validation boundary

AppDeploy READY/QA proves hosting behavior, not necessarily ChatGPT registration. Treat successful scan/creation and a real tool invocation in a normal ChatGPT conversation as a separate validation gate.
