import React, { useEffect, useState } from 'react'
import Icon from '../../assets/Icon'


function dashboard() {
    const [progress, setProgress] = useState(0);
    const themeChnage = () => {
        const theme = document.documentElement.getAttribute('data-theme')
        theme === 'dark' ? document.documentElement.setAttribute('data-theme', 'light') :
            document.documentElement.setAttribute('data-theme', 'dark')
    }

    useEffect(() => {
        if (progress >= 100) return;
        const interval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 1, 100));
        }, 100);

        return () => clearInterval(interval);
    }, [progress]);



    return (
        <>
            <section className="p-3 w-full">
                <div className="w-full">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-full rounded-full bg-violet-600 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="mt-1 text-right text-xs text-gray-500">
                        {progress}%
                    </div>
                </div>
                <h1 className="mt-3 text-2xl font-semibold">SVG Workspace</h1>
                {/* //Main Card Content */}

                <div>
                    <div className="grid grid-cols-3 gap-3">
                        {
                            Object.entries(Icon).map(([index, item]) => {
                                return (
                                    <div key={index} className="flex items-center gap-1">
                                        <img src={item} alt="" className="h-6 w-6" />
                                        <span>{index}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default dashboard