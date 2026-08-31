import { useState } from "react";

export const Theme = () => {
    const [theme, setTheme] = useState<string | null>(localStorage.getItem("theme") || null);
    const themeChnage = () => {
        const theme = document.documentElement.getAttribute('data-theme')
        theme === 'dark' ? document.documentElement.setAttribute('data-theme', 'light') :
            document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem("theme", theme === 'dark' ? 'light' : 'dark');
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    if (theme !== null) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    return (
        <button
            onClick={themeChnage}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 cursor-pointer ${theme === "dark" ? "bg-(--color-primary)" : "bg-gray-300"
                }`}
        >
            <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${theme === "dark" ? "translate-x-7" : "translate-x-0"
                    }`}
            />
        </button>
    )
}
