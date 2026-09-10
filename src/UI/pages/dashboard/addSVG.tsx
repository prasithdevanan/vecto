import React from 'react';
import { useContext } from "react";
import { AppContext } from '../../component/AppContent';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddSVG({ setOpenAddSVG }: any) {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const { backendUrl } = useContext(AppContext);
    // Function to handle file selection
    const handleFileUpload = async () => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const uploadUrl = `${backendUrl}/api/users/upload`; // Adjust the endpoint as needed
                const response = await axios.post(uploadUrl, formData);
                console.log('File uploaded successfully:', response.data);
                setOpenAddSVG(false); // Close the modal after successful upload
            } catch (error: any) {
                // Backend response
                console.log("Backend response:", error.response?.data);

                toast.error(`Error uploading file: ${error.response?.data?.message || error.message}`);
            }
        } else {
            console.log("No file selected.");
        }
    }

    return (
        <section className="w-full min-w-100 sm:w-1/2 rounded-2xl bg-(--color-bg) p-6 shadow-md">
            <h1 className="mb-5 text-xl font-semibold text-(--color-text)">
                Add SVG
            </h1>
            <button className="absolute top-4 right-4 cursor-pointer hover:text-red-500" onClick={() => setOpenAddSVG(false)}><span><i className="bi bi-x-lg"></i></span></button>

            <label htmlFor="svg-upload" className="inline-flex cursor-pointer items-center rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-(--color-primary-hover) hover:shadow-lg">
                <span className="mr-2">
                    <i className="bi bi-upload"></i>
                </span>
                Upload SVG
            </label>

            <input
                id="svg-upload"
                type="file"
                accept=".svg,image/svg+xml"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />


            <div className="mt-5 flex min-h-40 items-center justify-center rounded-xl border-2 border-dashed border-(--color-border) bg-(--color-bg) p-4">
                {selectedFile ? (
                    <>
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="SVG preview"
                            className="max-h-40 max-w-full object-contain"
                        />
                    </>
                ) : (
                    <span className="text-(--color-text)/60">No file selected</span>
                )}

            </div>
            {selectedFile && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter a name for the SVG"
                        className="mt-5 block w-full rounded-lg border-2 border-(--color-border) bg-(--color-bg) p-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:ring-(--color-primary) focus:ring-1 focus:outline-none"
                        value={selectedFile.name}
                        onChange={(e) => {
                            const newFile = new File([selectedFile], e.target.value, { type: selectedFile.type });
                            setSelectedFile(newFile);
                        }}
                    />
                </div>
            )}
            <div className="mt-5 flex justify-end">
                <button
                    disabled={!selectedFile}
                    className={`inline-flex cursor-pointer items-center rounded-lg bg-(--color-primary) px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-(--color-primary-hover) hover:shadow-lg ${!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleFileUpload}
                >
                    Upload
                </button>
            </div>


        </section>

    );
}

export default AddSVG;
