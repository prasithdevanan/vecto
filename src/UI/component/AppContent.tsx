import { createContext } from "react";

export const AppContext = createContext<{
    backendUrl: string;
}>({
    backendUrl: "http://localhost:3000",
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    return (
        <AppContext.Provider value={{ backendUrl }}>
            {children}
        </AppContext.Provider>
    );
};