import React from 'react';

function AddSVG() {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    return (
        <section className="w-full max-w-md rounded-2xl bg-(--color-bg) p-6 shadow-xl">
            <h1 className="mb-5 text-xl font-semibold text-(--color-text)">
                Add SVG
            </h1>

            <label
                htmlFor="svg-upload"
                className="inline-flex items-center rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-medium text-white cursor-pointer transition-all hover:bg-(--color-primary-hover) hover:shadow-lg"
            >
                <span className="mr-2">
                    <i className="bi bi-upload"></i>
                </span>
                Upload SVG
            </label>

            <input
                id="svg-upload"
                type="file"
                accept=".svg,image/svg+xml"
            
                onChange={(e) =>
                    setSelectedFile(e.target.files?.[0] ?? null)
                }
            />

            {selectedFile && (
                <div className="mt-5 flex min-h-40 items-center justify-center rounded-xl border-2 border-dashed border-(--color-border) bg-(--color-bg) p-4">
                    <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="SVG preview"
                        className="max-h-40 max-w-full object-contain"
                    />
                </div>
            )}
        </section>
    );
}

export default AddSVG;
