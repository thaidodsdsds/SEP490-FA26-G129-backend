import { WebSocketServer } from 'ws';
import env from '../config/env.js';

export const createWebSocketServer = (httpServer) => {
  const wss = new WebSocketServer({
    server: httpServer,
    path: env.wsPath,
  });

  wss.on('connection', (socket) => {
    console.info(`[ws] Client connected: ${socket.readyState}`);

    socket.on('message', (rawMessage) => {
      try {
        const message = JSON.parse(rawMessage.toString());
        console.info('[ws] Received message:', message);

        socket.send(JSON.stringify({
          type: 'ack',
          payload: {
            received: true,
            message,
          },
        }));
      } catch (error) {
        console.error('[ws] Invalid JSON received:', error.message);
        socket.send(JSON.stringify({
          type: 'error',
          payload: { message: 'Invalid JSON payload.' },
        }));
      }
    });

    socket.on('close', () => {
      console.info('[ws] Client disconnected');
    });

    socket.on('error', (error) => {
      console.error('[ws] Socket error:', error.message);
    });
  });

  wss.on('error', (error) => {
    console.error('[ws] WebSocket server error:', error);
  });

  return wss;
};
