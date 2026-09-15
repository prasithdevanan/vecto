import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SvgDetails() {
    const location = useLocation();
    const { state } = location as any;
    const navigate = useNavigate();

    const [originalSvg, setOriginalSvg] = useState<string>("");
    const [svgData, setSvgData] = useState<string>("");
    const [svgColor, setSvgColor] = useState<string>("#000000");
    const [svgSize, setSvgSize] = useState<number>(200);
    const [background, setBackground] = useState<string>("transparent");

    const getPrimaryColor = () => {
        return getComputedStyle(document.documentElement)
            .getPropertyValue("--color-primary")
            .trim();
    };

    /**
     * Update SVG color and size.
     * originalSvg is always used as the source so changes
     * don't stack on top of each other.
     */
    const updateSvg = (
        svg: string,
        color: string,
        size: number
    ) => {
        if (!svg) return "";

        return svg
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

                    const hasViewBox =
                        /\bviewBox\s*=/i.test(attrs);

                    let newAttrs = attrs
                        .replace(
                            /\s+width\s*=\s*["'][^"']*["']/gi,
                            ""
                        )
                        .replace(
                            /\s+height\s*=\s*["'][^"']*["']/gi,
                            ""
                        );

                    // If there is no viewBox, create one using
                    // the original SVG width and height.
                    if (!hasViewBox && width && height) {
                        const numericWidth =
                            parseFloat(width);
                        const numericHeight =
                            parseFloat(height);

                        if (
                            !isNaN(numericWidth) &&
                            !isNaN(numericHeight)
                        ) {
                            newAttrs += ` viewBox="0 0 ${numericWidth} ${numericHeight}"`;
                        }
                    }

                    return `<svg${newAttrs} width="${size}" height="${size}">`;
                }
            )

            // Existing fill attributes
            .replace(
                /fill\s*=\s*["'](?!none["'])[^"']*["']/gi,
                `fill="${color}"`
            )

            // Existing stroke attributes
            .replace(
                /stroke\s*=\s*["'](?!none["'])[^"']*["']/gi,
                `stroke="${color}"`
            )

            // Inline fill styles
            .replace(
                /fill\s*:\s*(?!none\b)[^;}"']+/gi,
                `fill: ${color}`
            )

            // Inline stroke styles
            .replace(
                /stroke\s*:\s*(?!none\b)[^;}"']+/gi,
                `stroke: ${color}`
            )

            // Add fill to elements that have neither fill nor stroke
            .replace(
                /<(path|circle|rect|polygon|polyline|ellipse)\b(?![^>]*\b(?:fill|stroke)\s*=)([^>]*)>/gi,
                `<$1 fill="${color}"$2>`
            )

            // Remove fill from inline style
            .replace(
                /style\s*=\s*["'][^"']*fill\s*:\s*[^;"']+;?[^"']*["']/gi,
                ""
            );
    };


    //  Load SVG from navigation state.

    useEffect(() => {
        if (!state?.svgData) return;

        const primaryColor = getPrimaryColor();

        setOriginalSvg(state.svgData);
        setSvgColor(primaryColor);

        const updatedSvg = updateSvg(
            state.svgData,
            primaryColor,
            200
        );

        setSvgData(updatedSvg);
    }, [state]);

    // Update SVG whenever color or size changes.

    useEffect(() => {
        if (!originalSvg) return;

        const updatedSvg = updateSvg(
            originalSvg,
            svgColor,
            svgSize
        );

        setSvgData(updatedSvg);
    }, [originalSvg, svgColor, svgSize]);

    /**
     * Copy SVG code.
     */
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(svgData);

            toast.success("SVG copied to clipboard");
        } catch (error) {
            console.error("Copy failed:", error);
            toast.error("Failed to copy SVG");
        }
    };


    //    Download SVG.

    const handleDownload = () => {
        try {
            const blob = new Blob(
                [svgData],
                { type: "image/svg+xml" }
            );

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = `${state?.name || "icon"}.svg`;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success("SVG downloaded");
        } catch (error) {
            console.error("Download failed:", error);
            toast.error("Failed to download SVG");
        }
    };

    /**
     * Reset customization.
     */
    const handleReset = () => {
        const primaryColor = getPrimaryColor();

        setSvgColor(primaryColor);
        setSvgSize(200);
        setBackground("transparent");
    };

    /**
     * Change color from text input.
     */
    const handleColorTextChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setSvgColor(value);
    };

    /**
     * Prevent invalid colors from being passed to SVG.
     */
    const handleColorBlur = () => {
        const color = svgColor.trim();

        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
            toast.error("Enter a valid HEX color");
            setSvgColor(getPrimaryColor());
        }
    };

    return (
        <section className="relative flex h-[calc(100vh-2px)] w-full min-w-0 flex-col overflow-hidden pt-0">
            {/* Header */}
            <div className="sticky top-0 z-50 mb-6 flex shrink-0 flex-col gap-3 border-b border-(--color-border) bg-(--color-bg) px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <button type="button" onClick={() => navigate(-1)} title="Go back" className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text)/70 transition-all duration-200 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-(--color-primary) active:scale-95">
                        <i className="bi bi-arrow-left text-base" />
                    </button>

                    <div className="min-w-0">
                        <h1 className="truncate text-xl font-semibold text-(--color-text)">
                            SVG Details
                        </h1>

                        {state?.name && (
                            <p className="mt-1 truncate text-sm text-(--color-text)/60">
                                {state.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                    <button type="button" onClick={handleReset} className="cursor-pointer rounded-lg border border-(--color-border) px-3 py-2 text-sm text-(--color-text) transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10">
                        <i className="bi bi-arrow-counterclockwise mr-2" />
                        Reset
                    </button>

                    <button type="button" onClick={handleCopy} className="button-primary cursor-pointer rounded-lg px-3 py-2 text-sm">
                        <i className="bi bi-copy mr-2" />
                        Copy
                    </button>

                    <button type="button" onClick={handleDownload} className="cursor-pointer rounded-lg bg-(--color-primary) px-3 py-2 text-sm text-(--color-white) transition hover:opacity-90">
                        <i className="bi bi-download mr-2" />
                        Download
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                {svgData ? (
                    <div className="grid min-w-0 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

                        {/* Preview */}
                        <div className="flex h-[500px] min-h-0 min-w-0 flex-col rounded-2xl border border-(--color-border) bg-(--color-bg) p-5 shadow-sm">
                            <div className="mb-4 flex shrink-0 items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-(--color-text)">
                                        Preview
                                    </h2>

                                    <p className="text-xs text-(--color-text)/50">
                                        Live preview
                                    </p>
                                </div>

                                <span className="rounded-full bg-(--color-primary)/10 px-3 py-1 text-xs font-medium text-(--color-primary)">
                                    {svgSize}px
                                </span>
                            </div>

                            <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-(--color-border) p-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ backgroundColor: background === "transparent" ? "transparent" : background }}>
                                <div className="flex min-h-full min-w-full items-center justify-center">
                                    <div className="shrink-0" dangerouslySetInnerHTML={{ __html: svgData }} />
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="min-w-0 rounded-2xl border border-(--color-border) bg-(--color-bg) p-5 shadow-sm">
                            <h2 className="mb-6 text-lg font-semibold text-(--color-text)">
                                Customize
                            </h2>

                            {/* Color */}
                            <div className="mb-7">
                                <label className="mb-2 block text-sm font-medium text-(--color-text)">
                                    Color
                                </label>

                                <div className="flex min-w-0 gap-2">
                                    <input type="color" value={/^#[0-9A-Fa-f]{6}$/.test(svgColor) ? svgColor : "#000000"} onChange={(e) => setSvgColor(e.target.value)} className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-(--color-border) bg-transparent p-1" />

                                    <input type="text" value={svgColor} onChange={handleColorTextChange} onBlur={handleColorBlur} className="min-w-0 flex-1 rounded-lg border border-(--color-border) bg-(--color-bg) px-3 py-2 text-sm text-(--color-text) outline-none transition focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]" placeholder="#000000" />
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {[
                                        "#000000",
                                        "#ffffff",
                                        "#ef4444",
                                        "#f97316",
                                        "#eab308",
                                        "#22c55e",
                                        "#3b82f6",
                                        "#8b5cf6",
                                    ].map((color) => (
                                        <button key={color} type="button" title={color} onClick={() => setSvgColor(color)} className={`h-7 w-7 cursor-pointer rounded-full border-2 transition hover:scale-110 ${svgColor.toLowerCase() === color.toLowerCase() ? "border-(--color-primary) ring-2 ring-(--color-primary)/20" : "border-transparent"}`} style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                            </div>

                            {/* Size */}
                            <div className="mb-7">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-sm font-medium text-(--color-text)">
                                        Size
                                    </label>

                                    <span className="text-sm font-semibold text-(--color-primary)">
                                        {svgSize}px
                                    </span>
                                </div>

                                <input type="range" min="10" max="510" step="10" value={svgSize} onChange={(e) => setSvgSize(Number(e.target.value))} className="w-full cursor-pointer accent-[var(--color-primary)]" />

                                <div className="mt-2 flex justify-between text-xs text-(--color-text)/50">
                                    <span>10px</span>
                                    <span>510px</span>
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                    <input type="number" min="10" max="1000" value={svgSize} onChange={(e) => setSvgSize(Math.min(1000, Math.max(10, Number(e.target.value))))} className="min-w-0 flex-1 rounded-lg border border-(--color-border) bg-(--color-bg) px-3 py-2 text-sm text-(--color-text) outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]" />

                                    <span className="shrink-0 text-sm text-(--color-text)/50">
                                        px
                                    </span>
                                </div>
                            </div>

                            {/* Background */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-(--color-text)">
                                    Background
                                </label>

                                <div className="grid grid-cols-4 gap-2">
                                    <button type="button" title="White" onClick={() => setBackground("#ffffff")} className={`h-10 cursor-pointer rounded-lg border bg-white ${background === "#ffffff" ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20" : "border-(--color-border)"}`} />

                                    <button type="button" title="Black" onClick={() => setBackground("#000000")} className={`h-10 cursor-pointer rounded-lg border bg-black ${background === "#000000" ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20" : "border-(--color-border)"}`} />

                                    <button type="button" title="Theme" onClick={() => setBackground("var(--color-bg)")} className={`h-10 cursor-pointer rounded-lg border bg-(--color-bg) ${background === "var(--color-bg)" ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20" : "border-(--color-border)"}`} />

                                    <button type="button" title="Transparent" onClick={() => setBackground("transparent")} className={`relative h-10 cursor-pointer overflow-hidden rounded-lg border ${background === "transparent" ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20" : "border-(--color-border)"}`}>
                                        <span className="absolute inset-0" style={{ backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)", backgroundSize: "12px 12px", backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px" }} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* SVG Code */}
                        <div className="min-w-0 lg:col-span-2">
                            <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg) shadow-sm">
                                <div className="flex flex-col gap-3 border-b border-(--color-border) p-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="min-w-0">
                                        <h2 className="text-lg font-semibold text-(--color-text)">
                                            SVG Code
                                        </h2>

                                        <p className="text-xs text-(--color-text)/50">
                                            Updated automatically
                                        </p>
                                    </div>

                                    <button type="button" onClick={handleCopy} className="w-fit shrink-0 cursor-pointer rounded-lg border border-(--color-border) px-3 py-2 text-xs text-(--color-text) transition hover:border-[var(--color-primary)] hover:text-(--color-primary)">
                                        <i className="bi bi-copy mr-1" />
                                        Copy Code
                                    </button>
                                </div>

                                <pre className="max-h-[500px] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words bg-black/5 p-5 text-xs leading-6 text-(--color-text)/80 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 sm:text-sm">
                                    <code className="block w-full break-words whitespace-pre-wrap">
                                        {svgData}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex min-h-75 items-center justify-center rounded-2xl border border-(--color-border)">
                        <p className="text-(--color-text)/60">
                            Loading SVG...
                        </p>
                    </div>
                )}
            </div>
        </section>
    );


}

export default SvgDetails;
