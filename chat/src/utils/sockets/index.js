import socketIOClient from 'socket.io-client/build/esm-debug'

export const socket = socketIOClient('http://localhost:3001')
