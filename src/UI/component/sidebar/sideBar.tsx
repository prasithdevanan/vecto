import React from 'react'

function SideBar() {
    const buttonName = ["Workspace", "Collection", "Teams", "Settings"]
    return (
        <>
            <section className= "max-w-[200px] p-2">
                <div className= "shrink-0 flex flex-col gap-2">
                    {
                        buttonName.map((button, index) => {
                            return (
                                <div key={index}>
                                    <button className='p-2 w-full cursor-pointer rounded-md hover:bg-gray-100'>{button}</button>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default SideBar