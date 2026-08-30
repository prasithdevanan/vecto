import { useState } from "react";

export const Theme = () => {
    const [theme, setTheme] = useState<string | null>(localStorage.getItem("theme") || null);
    const themeChnage = () => {
        if (theme === null) {
            const theme = document.documentElement.getAttribute('data-theme')
            theme === 'dark' ? document.documentElement.setAttribute('data-theme', 'light') :
                document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem("theme", theme === 'dark' ? 'light' : 'dark');
            setTheme(theme === 'dark' ? 'light' : 'dark');
        } else {
            const theme = document.documentElement.getAttribute('data-theme')
            theme === 'dark' ? document.documentElement.setAttribute('data-theme', 'light') :
                document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem("theme", theme === 'dark' ? 'light' : 'dark');
            setTheme(theme === 'dark' ? 'light' : 'dark');
        }
    }

    return (
        <button className="button-primary py-2 px-4 rounded-md" onClick={themeChnage}>Theme</button>
    )
}
