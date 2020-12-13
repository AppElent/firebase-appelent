import React, { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export const SocketIOContext = React.createContext<SocketIOClient.Socket | undefined>(undefined);

//export const useSocket = (): any => useContext(SocketIOContext); // eslint-disable-line

export { io };

export interface SocketIOProviderProps {
  url: string;
  opts?: SocketIOClient.ConnectOpts;
}

export const SocketIOProvider: React.FC<SocketIOProviderProps> = ({ url, opts, children }: any) => {
  const socketRef = useRef<SocketIOClient.Socket>();

  if (!socketRef.current) {
    socketRef.current = io(url, opts || {});
  }

  return <SocketIOContext.Provider value={socketRef.current}>{children}</SocketIOContext.Provider>;
};

export const useSocket = (eventKey: string, callback?: (...args: any) => void) => {
  const socket: any = useContext(SocketIOContext);
  const [lastMessage, setLastMessage] = useState();

  const eventCallback = async (data: any) => {
    console.log(data);
    setLastMessage(data);
    if (callback) callback(data);
  };

  const subscribe = () => {
    if (eventKey) {
      socket.on(eventKey, eventCallback);
    }
  };

  const unsubscribe = () => {
    if (eventKey) {
      socket.removeListener(eventKey, eventCallback);
    }
  };

  useEffect(() => {
    subscribe();

    return unsubscribe;
  }, [eventKey]);

  return { lastMessage, socket, unsubscribe, subscribe };
};
