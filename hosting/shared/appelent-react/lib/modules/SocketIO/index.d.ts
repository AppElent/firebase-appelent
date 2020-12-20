import React from 'react';
import io from 'socket.io-client';
export declare const SocketIOContext: React.Context<SocketIOClient.Socket | undefined>;
export { io };
export interface SocketIOProviderProps {
    url: string;
    opts?: SocketIOClient.ConnectOpts;
}
export declare const SocketIOProvider: React.FC<SocketIOProviderProps>;
export declare const useSocket: (eventKey: string, callback?: ((...args: any) => void) | undefined) => {
    lastMessage: undefined;
    socket: any;
    unsubscribe: () => void;
    subscribe: () => void;
};
