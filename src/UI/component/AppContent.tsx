import { createContext, useEffect, useState } from "react";

type Theme = 'light' | 'dark';

type AppContextType = {
    backendUrl: string;
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const AppContext = createContext<AppContextType>({
    backendUrl: "http://localhost:3000",
    theme: 'light',
    setTheme: () => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme as Theme || 'light';
    });
    //Apply the theme for the application
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <AppContext.Provider value={{ backendUrl, theme, setTheme }}>
            {children}
        </AppContext.Provider>
    );
};