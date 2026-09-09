import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useContext } from "react";
import { AppContext } from '../../component/AppContent';
import AddSVG from './addSVG'


function dashboard() {
    // const [progress, setProgress] = useState(0);
    const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
    const { backendUrl } = useContext(AppContext);
    const [allIcons, setAllIcons] = useState<any>([]);
    const [Icon, setIcon] = useState<any>([]);
    const [openAddSVG, setOpenAddSVG] = useState(false);
    console.log("Backend URL:", backendUrl); // Log the backend URL to verify it's being accessed correctly


    // useEffect(() => {
    //     if (progress >= 100) return;
    //     const interval = setInterval(() => {
    //         setProgress((prev) => Math.min(prev + 1, 100));
    //     }, 100);

    //     return () => clearInterval(interval);
    // }, [progress]);

    //Copy to clipboard
    const handleCopy = async (text: string) => {
        try {
            const svgCode = decodeURIComponent(text.replace(/^data:image\/svg\+xml,/, ""));
            await navigator.clipboard.writeText(svgCode);
            setCopiedIcon(text);
            toast.info("Copied to clipboard");
            console.log("Copied to clipboard", text);
            setTimeout(() => {
                setCopiedIcon(null);
            }, 5000);

        } catch (error) {
            console.log("Failed to copy", error)
        }
    }

    //Search
    const handleSearch = (e: any) => {
        const value = e.target.value.toLowerCase();
        if (value === "") {
            setAllIcons(Icon);
            return;
        }
        const filtered = Icon.filter((item: any) =>
            item.name.toLowerCase().includes(value)
        );

        setAllIcons(filtered);

    }

    useEffect(() => {
        const fetchIcons = async () => {
            try {
                const response = await fetch(`${backendUrl}/fetchdata`);
                if (!response.ok) {
                    throw new Error('Failed to fetch icons');
                }
                const data = await response.json();

                const icons = Promise.all(data.map(async (item: any) => {
                    console.log("Fetching SVG for:", item.name);
                    const svgResponse = await fetch(`${backendUrl}/uploads/${item.name}`);
                    if (!svgResponse.ok) {
                        throw new Error(`Failed to fetch SVG for ${item.name}`);
                    }
                    const svgData = await svgResponse.text();
                    return { ...item, svg: svgData };
                }));
                setIcon(await icons);
                setAllIcons(await icons);
                console.log("All icons:", allIcons);
            } catch (error) {
                console.error('Error fetching icons:', error);
            }
        };

        fetchIcons();
    }, [backendUrl]);


    return (
        <>
            <section className="p-3 w-full">
                <nav className="flex items-center justify-between mb-2">
                    <h1 className="mt-3 text-2xl font-semibold mb-3">SVG Workspace</h1>
                    <div className="rounded-xl border border-(--color-border)">
                        <span className="px-2 py-2 text-(--color-text)/60"><i className="bi bi-search"></i></span>
                        <input type="search" className="focus:outline-none pr-2 py-2 !border-transparent !bg-transparent" placeholder="Search..." onChange={(e) => handleSearch(e)} />
                    </div >
                    <button className="button-primary p-2 px-3 rounded-xl cursor-pointer hover:bg-(--color-primary-hover) hover:shadow-lg" onClick={() => setOpenAddSVG(true)}><span className="mr-2"><i className="bi bi-plus"></i></span>Add SVG</button>
                </nav >

                {/* //Main Card Content */}

                < div >
                    <h2 className="mt-3 text-md font-semibold mb-3 text-(--color-text)/60">ICONS</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                        {
                            Object.entries(allIcons).map(([index, item]: any) => {
                                return (
                                    <div key={index} className="group relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-(--color-border) bg-(--color-bg) px-3 py-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-variant)] hover:shadow-lg sm:min-h-28 sm:gap-3 sm:px-5 sm:py-6">

                                        <button type="button" disabled={copiedIcon === item} className="absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-white active:scale-95 sm:top-3 sm:right-3 sm:h-9 sm:w-9 sm:rounded-xl" title="Copy" onClick={() => handleCopy(item.svg as string)}>

                                            <i className="bi bi-copy text-xs sm:text-sm"></i>
                                        </button>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-primary)/10 transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12">
                                            <span
                                                className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7"
                                                style={{ color: `var(--color-primary)` }}
                                                dangerouslySetInnerHTML={{
                                                    __html: decodeURIComponent(item.svg)
                                                        .replace(
                                                            /<svg\b([^>]*)>/i,
                                                            (_match: string, attrs: string) => {
                                                                const widthMatch = attrs.match(
                                                                    /\s+width\s*=\s*["']([^"']*)["']/i
                                                                );

                                                                const heightMatch = attrs.match(
                                                                    /\s+height\s*=\s*["']([^"']*)["']/i
                                                                );

                                                                const width = widthMatch?.[1];
                                                                const height = heightMatch?.[1];

                                                                const newAttrs = attrs
                                                                    .replace(
                                                                        /\s+width\s*=\s*["'][^"']*["']/gi,
                                                                        ""
                                                                    )
                                                                    .replace(
                                                                        /\s+height\s*=\s*["'][^"']*["']/gi,
                                                                        ""
                                                                    );

                                                                return `<svg${newAttrs}${width && height
                                                                        ? ` viewBox="0 0 ${width} ${height}"`
                                                                        : ""
                                                                    } width="100%" height="100%">`;
                                                            }
                                                        )

                                                        // Only change fill if it is NOT "none"
                                                        .replace(
                                                            /fill\s*=\s*["'](?!none["'])[^"']*["']/gi,
                                                            'fill="currentColor"'
                                                        )

                                                        // Always change stroke color
                                                        .replace(
                                                            /stroke\s*=\s*["'][^"']*["']/gi,
                                                            'stroke="currentColor"'
                                                        )

                                                        // Add fill only when the SVG element has no fill AND no stroke
                                                        .replace(
                                                            /<(path|circle|rect|polygon|polyline|ellipse)\b(?![^>]*\b(?:fill|stroke)\s*=)([^>]*)>/gi,
                                                            '<$1 fill="currentColor"$2>'
                                                        )

                                                        // Remove fill color from inline style
                                                        .replace(
                                                            /style\s*=\s*["'][^"']*fill\s*:\s*[^;"']+;?[^"']*["']/gi,
                                                            ""
                                                        )
                                                }}



                                            />


                                        </div>



                                        <span className="rounded-full bg-(--color-primary)/10 px-2 py-0.5 text-[10px] font-semibold text-(--color-text-variant) sm:px-2.5 sm:py-1 sm:text-xs">
                                            {item?.name?.length > 10 ? item?.name?.substring(0, 14) + "..." : item?.name}
                                        </span>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div >
                <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${openAddSVG ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpenAddSVG(false)}>
                    <div className={`transition-all duration-300 ease-out ${openAddSVG ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`} onClick={(e) => e.stopPropagation()}>
                        <AddSVG setOpenAddSVG={setOpenAddSVG} />
                    </div>
                </div>


            </section >
        </>
    )
}

export default dashboard