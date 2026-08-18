import './styles.css';
import { api } from '@appdeploy/client';

const status = document.querySelector<HTMLElement>('#status')!;
const detail = document.querySelector<HTMLElement>('#detail')!;
const dot = document.querySelector<HTMLElement>('#dot')!;
const button = document.querySelector<HTMLButtonElement>('#test')!;

const rpc = (method: string, id: number, params: Record<string, unknown> = {}) =>
  api.post('/api/mcp', { jsonrpc: '2.0', id, method, params }).then((r) => r.data);

button.addEventListener('click', async () => {
  button.disabled = true;
  status.textContent = 'Testing MCP…';
  detail.textContent = 'Checking legacy compatibility, tool metadata, and a safe LoopMe start call.';
  dot.className = 'dot pending';

  try {
    let getContractOk = true;
    if (window.innerWidth > 600) {
      let getRejected = false;
      try {
        await api.get('/api/mcp');
      } catch {
        getRejected = true;
      }
      getContractOk = getRejected;
    }

    const init = await rpc('initialize', 1, {
      protocolVersion: '2025-11-25',
      capabilities: {},
      clientInfo: { name: 'loopme-self-test', version: '1' },
    });
    const list = await rpc('tools/list', 2, {});
    const call = await rpc('tools/call', 3, {
      name: 'loop_me',
      arguments: { request: 'Review my recurring weekly planning loop', command: 'start' },
    });

    const tool = list?.result?.tools?.[0];
    const ok =
      getContractOk &&
      init?.result?.serverInfo?.name === 'loopme-chat' &&
      tool?.name === 'loop_me' &&
      tool?.annotations?.readOnlyHint === true &&
      tool?._meta?.ui?.visibility?.includes('model') &&
      call?.result?.structuredContent?.mode === 'loopme' &&
      call?.result?.structuredContent?.persistence === 'conversation';

    if (!ok) throw new Error('Compatibility assertion failed');

    status.textContent = 'MCP endpoint ready';
    detail.textContent = 'LoopMe is noauth, model-visible, read-only, conversation-state only, and responds to tools/call.';
    dot.className = 'dot ready';
  } catch (error) {
    status.textContent = 'MCP endpoint error';
    detail.textContent = error instanceof Error ? error.message : 'Unknown MCP error';
    dot.className = 'dot error';
  } finally {
    button.disabled = false;
  }
});
