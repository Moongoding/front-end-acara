import { createContext, useState, useCallback, useEffect } from "react";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface IToaster {
    id: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
}

interface IToasterState {
    toasters: IToaster[];
    showToaster: (toast: Omit<IToaster, "id">) => void;
    removeToaster: (id: string) => void;
}

const ToasterContext = createContext<IToasterState>({
    toasters: [],
    showToaster: () => { },
    removeToaster: () => { },
});

const ToasterProvider = ({ children }: { children: ReactNode }) => {
    const [toasters, setToasters] = useState<IToaster[]>([]);

    const showToaster = useCallback((toast: Omit<IToaster, "id">) => {
        const id = uuidv4();
        const newToast = { ...toast, id };
        setToasters((prev) => [...prev, newToast]);

        // Auto remove after 3s
        setTimeout(() => {
            setToasters((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToaster = useCallback((id: string) => {
        setToasters((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToasterContext.Provider value={{ toasters, showToaster, removeToaster }}>
            {children}
        </ToasterContext.Provider>
    );
};

export { ToasterProvider, ToasterContext };
export type { IToaster, IToasterState };
