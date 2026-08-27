import React, { useEffect } from 'react'

function dashboard() {
    const themeChnage = () => {
        const theme = document.documentElement.getAttribute('data-theme')
        theme === 'dark' ? document.documentElement.setAttribute('data-theme', 'light') :
            document.documentElement.setAttribute('data-theme', 'dark')
    }
    return (
        <>
            <section>
                <div>
                    <input type="text" placeholder="Search"></input>
                </div>
                <div>
                    <button onClick={() => themeChnage()}>Theme</button>
                </div>
            </section>
        </>
    )
}

export default dashboard