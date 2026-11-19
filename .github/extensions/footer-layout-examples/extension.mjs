import { createCanvas, joinSession } from '@github/copilot-sdk/extension';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const servers = new Map();
const baseDir = path.dirname(fileURLToPath(import.meta.url));
const declaration = JSON.parse(fs.readFileSync(path.join(baseDir, 'extension.json'), 'utf8'));

const canvas = createCanvas({
  ...declaration.canvases[0],
  open: async ({ instanceId }) => {
    let server = servers.get(instanceId);
    if (!server) {
      server = http.createServer((request, response) => {
        const file = path.join(baseDir, 'index.html');
        fs.readFile(file, (error, data) => {
          if (error) {
            response.writeHead(500, { 'content-type': 'text/plain' });
            response.end('No se pudo cargar el canvas.');
            return;
          }
          response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
          response.end(data);
        });
      });
      await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', resolve);
      });
      servers.set(instanceId, server);
    }
    const address = server.address();
    return `http://127.0.0.1:${address.port}/`;
  },
  onClose: async ({ instanceId }) => {
    const server = servers.get(instanceId);
    if (server) {
      await new Promise(resolve => server.close(resolve));
      servers.delete(instanceId);
    }
  },
  actions: [{
    name: 'select_layout',
    description: 'Selecciona una de las propuestas de footer.',
    inputSchema: {
      type: 'object',
      properties: {
        layout: {
          type: 'string',
          enum: ['grid', 'centered', 'editorial', 'split']
        }
      },
      required: ['layout']
    },
    handler: async ({ input }) => ({ selected: input.layout })
  }]
});

await joinSession({ canvases: [canvas] });
