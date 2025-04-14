import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContexts";
import Toaster from "./Toaster";

const ToasterContainer = () => {
    const { toasters } = useContext(ToasterContext);

    return (
        <div className="fixed top-8 right-8 z-[9999] space-y-4">
            {toasters.map((toast) => (
                <Toaster
                    key={toast.id}
                    type={toast.type}
                    message={toast.message}
                />
            ))}
        </div>
    );
};

export default ToasterContainer;
