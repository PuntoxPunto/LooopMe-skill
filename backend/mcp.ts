type Rpc = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

const SERVER_INFO = { name: 'loopme-chat', version: '1.0.0' };
const MODERN_VERSION = '2026-07-28';
const LEGACY_VERSIONS = new Set(['2025-11-25', '2025-06-18', '2025-03-26']);
const MODERN_METHODS = new Set([
  'server/discover',
  'ping',
  'tools/list',
  'resources/list',
  'resources/read',
  'tools/call',
]);
const NOAUTH = [{ type: 'noauth' }];

const INSTRUCTIONS =
  'Use LoopMe when the user explicitly wants to discover recurring loops or turn one into an implementable workflow specification. LoopMe is read-only and does not execute, schedule, or persist the workflow.';

const tool = {
  name: 'loop_me',
  title: 'LoopMe',
  description:
    'Use this when the user explicitly asks to discover, design, stress-test, resume, inspect, or export a recurring personal or work workflow using LoopMe.',
  inputSchema: {
    type: 'object',
    properties: {
      request: {
        type: 'string',
        description: 'The loop, workflow, world description, or continuation request.',
      },
      command: {
        type: 'string',
        enum: ['start', 'status', 'resume', 'export', 'stop'],
        default: 'start',
      },
    },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      mode: { type: 'string', const: 'loopme' },
      command: { type: 'string' },
      request: { type: 'string' },
      readOnly: { type: 'boolean' },
      persistence: { type: 'string', const: 'conversation' },
    },
    required: ['mode', 'command', 'request', 'readOnly', 'persistence'],
    additionalProperties: false,
  },
  securitySchemes: NOAUTH,
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
  _meta: {
    securitySchemes: NOAUTH,
    ui: { visibility: ['model'] },
  },
};

const metaResult = (result: Record<string, unknown>) => ({
  ...result,
  resultType: 'complete',
  _meta: {
    ...((result._meta as Record<string, unknown>) || {}),
    'io.modelcontextprotocol/serverInfo': SERVER_INFO,
  },
});

const response = (
  statusCode: number,
  value: unknown,
  extra: Record<string, string> = {},
) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    ...extra,
  },
  body: value === null ? '' : JSON.stringify(value),
});

const rpcError = (id: unknown, code: number, message: string) => ({
  jsonrpc: '2.0',
  id,
  error: { code, message },
});

const directive = (command: string, request: string) => `LOOPME MODE — ${command.toUpperCase()}

LoopMe is a read-only workflow-design session. The CURRENT CONVERSATION is the session state; the server stores nothing. A LOOP is a recurring pattern in the user's work or life. A WORKFLOW is an implementable specification for one loop. Do not execute the workflow, create automations, send messages, change services, or persist private data while LoopMe is active.

User request: ${request || '(use current conversation context)'}

CORE LENS: discover repeatable loops worth delegating, then specify one until an implementer could build it without asking another question. Do not mandate AI, checkpoints, or schedules unless the loop requires them. Prefer event triggers when they fit. PUSH RIGHT means defer a human checkpoint as far as safely possible so the user is interrupted once, late, with maximum preparation. A BRIEF is the concise decision-ready information shown at a checkpoint, not raw output.

STATE TO TRACK IN THE VISIBLE CHAT: loop name; desired outcome; why it repeats; trigger (event/schedule/manual); frequency/volume; inputs; ordered steps; tools/channels; deterministic vs judgment work; automation boundary; human checkpoint(s) if any; push-right rationale; checkpoint brief; outputs/destinations; exceptions/failure handling; privacy/permissions; assumptions; unresolved decisions; definition of done.

QUESTIONING: use dependency-aware grilling. Ask the whole currently-unblocked frontier in one round, with a short recommended answer for each decision. Facts are the assistant's job to investigate with available tools when useful; decisions belong to the user. Answers may reshape the workflow, so recompute unresolved dependencies after each round.

START: If the request names a concrete loop, begin specifying it. If it is broad, first understand the user's world just enough to identify repeated activities, then propose a small ranked set of candidate loops with frequency, value, delegability, and risk; recommend one and ask the user to choose.

STATUS: Summarize the current workflow spec, settled decisions, assumptions, risks, and unresolved frontier. Ask no new questions unless necessary to explain a blocker.

RESUME: Continue from the current visible conversation state and ask the current frontier.

EXPORT: Produce a clean Markdown workflow spec only if an implementer could build it without asking another question. Otherwise list the unresolved decisions and continue grilling instead of pretending it is complete. The exported spec should include Outcome, Trigger, Inputs, Steps, Tools/Channels, Automation Boundary, Checkpoints/Briefs, Outputs, Exceptions, Privacy/Permissions, Definition of Done, and Open Assumptions if any.

STOP: Exit LoopMe mode and summarize where the workflow design stopped.

Do not reveal private chain-of-thought.`;

const rpc = async (r: Rpc) => {
  const id = r.id ?? null;

  if (r.method === 'server/discover') {
    return {
      jsonrpc: '2.0',
      id,
      result: metaResult({
        supportedVersions: [MODERN_VERSION],
        capabilities: { tools: {}, resources: {} },
        instructions: INSTRUCTIONS,
        ttlMs: 60000,
        cacheScope: 'public',
      }),
    };
  }

  if (r.method === 'initialize') {
    const requested = String((r.params && r.params.protocolVersion) || '2025-11-25');
    const protocolVersion = LEGACY_VERSIONS.has(requested) ? requested : '2025-11-25';
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion,
        capabilities: {
          tools: { listChanged: false },
          resources: { listChanged: false },
        },
        serverInfo: SERVER_INFO,
        instructions: INSTRUCTIONS,
      },
    };
  }

  if (r.method === 'ping') {
    return { jsonrpc: '2.0', id, result: metaResult({}) };
  }

  if (r.method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: metaResult({ tools: [tool], ttlMs: 60000, cacheScope: 'public' }),
    };
  }

  if (r.method === 'resources/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: metaResult({ resources: [], ttlMs: 60000, cacheScope: 'public' }),
    };
  }

  if (r.method === 'resources/read') {
    return rpcError(id, -32002, 'Resource not found');
  }

  if (r.method === 'tools/call') {
    const p = (r.params || {}) as {
      name?: string;
      arguments?: Record<string, unknown>;
    };

    if (p.name !== 'loop_me') {
      return {
        jsonrpc: '2.0',
        id,
        result: metaResult({
          isError: true,
          content: [{ type: 'text', text: 'Tool error: unknown tool' }],
        }),
      };
    }

    const a = p.arguments || {};
    const request = String(a.request || '');
    const command = String(a.command || 'start');

    return {
      jsonrpc: '2.0',
      id,
      result: metaResult({
        content: [{ type: 'text', text: directive(command, request) }],
        structuredContent: {
          mode: 'loopme',
          command,
          request,
          readOnly: true,
          persistence: 'conversation',
        },
        isError: false,
      }),
    };
  }

  if (r.method === 'notifications/initialized') return null;

  return rpcError(id, -32601, `Method not found: ${r.method}`);
};

export const mcpGet = async () =>
  response(
    405,
    { error: 'SSE stream not offered; use POST for MCP JSON-RPC.' },
    { Allow: 'POST' },
  );

export const mcpPost = async (ctx: {
  body: unknown;
  event: { headers?: Record<string, unknown> };
}) => {
  const body = ctx.body;

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return response(400, rpcError(null, -32600, 'Invalid JSON-RPC request'));
  }

  const request = body as Rpc;
  const raw = (ctx.event?.headers || {}) as Record<string, unknown>;
  const headers = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k.toLowerCase(), String(v ?? '')]),
  );

  const protocol = headers['mcp-protocol-version'] || '';
  const method = String(request.method || '');
  const params = (request.params || {}) as Record<string, unknown>;
  const bodyMeta = (params._meta || {}) as Record<string, unknown>;
  const bodyVersion = String(bodyMeta['io.modelcontextprotocol/protocolVersion'] || '');
  const modern =
    protocol === MODERN_VERSION ||
    bodyVersion === MODERN_VERSION ||
    method === 'server/discover';

  console.warn(
    'MCP_REQUEST',
    JSON.stringify({
      method,
      protocol: protocol || null,
      bodyVersion: bodyVersion || null,
      mcpMethod: headers['mcp-method'] || null,
      mcpName: headers['mcp-name'] || null,
      userAgent: headers['user-agent'] || null,
      modern,
    }),
  );

  if (modern) {
    if (protocol !== MODERN_VERSION || bodyVersion !== MODERN_VERSION) {
      return response(
        400,
        rpcError(
          request.id ?? null,
          -32020,
          'Header mismatch: MCP-Protocol-Version and request _meta protocolVersion must both be 2026-07-28',
        ),
      );
    }

    if (headers['mcp-method'] !== method) {
      return response(
        400,
        rpcError(
          request.id ?? null,
          -32020,
          'Header mismatch: Mcp-Method does not match JSON-RPC method',
        ),
      );
    }

    const expectedName =
      method === 'tools/call'
        ? String(params.name || '')
        : method === 'resources/read'
          ? String(params.uri || '')
          : '';

    if (expectedName && headers['mcp-name'] !== expectedName) {
      return response(
        400,
        rpcError(
          request.id ?? null,
          -32020,
          'Header mismatch: Mcp-Name does not match request body',
        ),
      );
    }

    if (!MODERN_METHODS.has(method)) {
      return response(404, rpcError(request.id ?? null, -32601, `Method not found: ${method}`));
    }

    const out = await rpc(request);
    return out === null ? response(202, null) : response(200, out);
  }

  if (method !== 'initialize' && protocol && !LEGACY_VERSIONS.has(protocol)) {
    return response(
      400,
      rpcError(request.id ?? null, -32000, 'Unsupported MCP protocol version'),
    );
  }

  const out = await rpc(request);
  return out === null ? response(202, null) : response(200, out);
};
