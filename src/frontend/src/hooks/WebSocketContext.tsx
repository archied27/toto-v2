import { useWebSocket, type ConnectionStatus } from "@/hooks/useWebSocket";
import { createContext, useContext, useEffect, useRef } from "react";

export interface WSMessage {
    type: string;
    data: unknown;
}

export interface WSContextValue {
    connectionStatus: ConnectionStatus;
    useEvent: (eventType: string, handler: (data:unknown) => void) => void;
    send: (message: unknown) => void;
}

const WebSocketContext = createContext<WSContextValue | null>(null);

export function WebSocketProvider({ url, children }: { url:string, children: React.ReactNode })
{
    const { connectionStatus, lastMessage, send } = useWebSocket(url);
    // registry of handlers
    // e.g { "dashboard.rerank": [function, function] }
    const handlersRef = useRef<Map<string, Set<(data: unknown) => void>>>(new Map());

    useEffect(() => {
        if(!lastMessage) return;

        const msg = lastMessage as WSMessage;
        const handlers = handlersRef.current.get(msg.type);

        if (handlers) {
            handlers.forEach(fn => fn(msg.data));
        }
    }, [lastMessage])

    const useEvent = (eventType: string, handler: (data: unknown) => void) => {
        useEffect(() => {
            if(!handlersRef.current.has(eventType)) {
                handlersRef.current.set(eventType, new Set());
            }
            handlersRef.current.get(eventType)!.add(handler);

            return () => {
                handlersRef.current.get(eventType)!.delete(handler);
            };
        }, [eventType, handler]);
    };

    return (
        <WebSocketContext.Provider value={{ connectionStatus, useEvent, send }}>
            { children }
        </WebSocketContext.Provider>
    );
}

export function useWebSocketContext() {
    const context = useContext(WebSocketContext);
    if (!context) throw new Error("useWebSocketContext hook used outside WebSocketProvider");
    return context;
}