import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
    const menuItems = [
        {
            name: "Workspace",
            path: "/",
        },
        {
            name: "Collection",
            path: "/collection",
        },
        {
            name: "Settings",
            path: "/settings",
        },
    ];

    return (
        <aside className="flex h-screen w-[220px] flex-col border-r border-[var(--color-border)] bg-[var(--color-bg)] p-3">

            {/* Brand */}
            <div className="mb-8 px-3">
                <h1 className="!m-0 !text-lg !font-semibold !text-[var(--color-text)]">
                    Vecto
                </h1>

                <p className="mt-1 text-xs text-[var(--color-text-variant)]">
                    SVG Workspace
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-variant)]">
                    Menu
                </p>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `block w-full rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors ${isActive
                                ? "bg-[var(--color-primary-variant)] !text-[var(--color-primary)]"
                                : "!text-[var(--color-text-variant)] hover:bg-[var(--color-bg-variant)] hover:!text-[var(--color-text)]"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom */}
            <div className="mt-auto">
                <div className="mb-3 h-px bg-[var(--color-border)]" />

                <div className="rounded-lg px-3 py-2">
                    <p className="truncate text-sm font-medium !text-[var(--color-text)]">
                        John Doe
                    </p>

                    <p className="mt-0.5 truncate text-xs !text-[var(--color-text-variant)]">
                        Free workspace
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default SideBar;
