import { ReactNode, useEffect, useState } from "react";
import { CiCircleCheck, CiCircleRemove, CiCircleInfo, CiWarning } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

const iconList: { [key: string]: ReactNode } = {
    success: <CiCircleCheck className="text-3xl text-green-600" />,
    error: <CiCircleRemove className="text-3xl text-red-600" />,
    info: <CiCircleInfo className="text-3xl text-blue-600" />,
    warning: <CiWarning className="text-3xl text-yellow-600" />,
};

const bgColor: Record<string, string> = {
    success: "bg-green-50 border-green-300 text-green-800",
    error: "bg-red-50 border-red-300 text-red-800",
    info: "bg-blue-50 border-blue-300 text-blue-800",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
};

interface PropTypes {
    type: string;
    message: string;
}

const Toaster = ({ type, message }: PropTypes) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    role="alert"
                    aria-labelledby="toaster-label"
                    className={`fixed right-8 top-8 z-50 max-w-xs rounded-xl border shadow-md p-4 flex items-start gap-3 ${bgColor[type] || "bg-white border-gray-200 text-gray-800"
                        }`}
                >
                    {iconList[type] || iconList.info}
                    <p id="toaster-label" className="text-sm font-medium">
                        {message}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toaster;
