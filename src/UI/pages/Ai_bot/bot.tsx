import React, { useState, useEffect } from 'react'

function Bot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello, how can I help you today?",
            role: "ai"
        }
    ]);


    //handle AI Assistant chat
    const handleChat = (e: any) => {
        e.preventDefault();
        if (!message) return

        const newMessage = {
            id: Date.now(),
            text: message,
            role: "user"
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
    }

    useEffect(() => {
        if (!isOpen) return;
        const newMessages = [
            {
                id: Date.now(),
                text: "Next time you need help, just click on the AI Assistant button.",
                role: "ai"
            },
            {
                id: Date.now(),
                text: "Goodbye!",
                role: "ai"
            }
        ]

        const message1 = setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, newMessages[0]]);
        }, 2000)

        const message2 = setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, newMessages[1]]);
        }, 12000)

        return () => {
            clearTimeout(message1);
            clearTimeout(message2);
            setMessages([]);
        }
    }, [isOpen])



    console.log(messages);
    return (
        <>
            <section>
                <div className="absolute bottom-10 right-10">


                    <button className="relative w-16 h-16 flex items-center justify-center rounded-full p-2 px-3 
                                    before:content-['']
                                    before:absolute
                                    before:inset-0
                                    before:-z-10
                                    before:rounded-full
                                    before:[background-image:var(--color-ai-gradient)]
                                    before:opacity-40 
                                    cursor-pointer transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
                        title='AI Assistant'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="text-3xl [background-image:var(--color-ai-gradient)] bg-clip-text text-transparent">
                            <i className="bi bi-robot"></i>
                        </span>
                    </button>
                </div>

                {/* // AI Assistant */}
                <div className={`absolute right-10 bottom-30 w-100 transition-all duration-300 ease-out ${isOpen ? "opacity-100 translate-y-0 shadow-md" : "opacity-0 translate-y-10 pointer-events-none"} rounded-2xl`}>
                    <div className="rounded-2xl border border-(--color-border) bg-(--color-card) p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-(--color-primary-variant)">
                                    <i className="bi bi-robot text-lg text-(--color-primary)"></i>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-(--color-text)">AI Assistant</p>
                                    <p className="text-xs text-(--color-text-variant)">Your AI companion</p>
                                </div>
                            </div>

                            <button className="text-(--color-text-variant) hover:text-(--color-text) cursor-pointer" title="Close" onClick={() => setIsOpen(false)}>
                                <i className="bi bi-x-lg text-xs"></i>
                            </button>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl bg-green-500/5 border border-green-500/10 px-3 py-2 w-fit">
                            <div className="relative flex items-center justify-center w-4 h-4">
                                <div className="absolute w-4 h-4 bg-green-500/20 rounded-full animate-ping"></div>
                                <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>

                            <span className="text-xs font-medium text-green-600">Online</span>
                        </div>
                        {messages.length > 0 && (
                            <div className="relative flex flex-col gap-2 p-2">
                                {messages.map((message: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                            }`}
                                    >
                                        <div
                                            className={`p-2 rounded-lg ${message.role === "user"
                                                ? "bg-(--color-primary) max-w-[70%]"
                                                : "bg-(--color-card) max-w-[80%]"
                                                }`}
                                        >
                                            <p className="break-words">{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="relative mt-3">
                            <input type="text" className="w-full rounded-md bg-(--color-form) px-4 py-2 pr-12 text-(--color-text) placeholder:text-(--color-text-variant) placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary)/50"
                                placeholder="Type your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <button type="submit" className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-(--color-primary) transition-colors hover:bg-(--color-primary-variant) cursor-pointer" title="Send message" onClick={handleChat}>
                                <i className="bi bi-send text-lg"></i>
                            </button>
                        </div>


                    </div>
                </div>


            </section >
        </>
    )
}

export default Bot