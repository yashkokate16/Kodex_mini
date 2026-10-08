import React from "react";
import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble.jsx";
import TypingLoader from "./TypingLoader.jsx";


function MessageArea() {
    const { messages, isLoading } = useSelector((state) => state.message);
    console.log("messages", messages);
    const { selectedConversation } = useSelector(
        (state) => state.conversation
    );


    if (!selectedConversation || messages.length === 0) {
        return (
            <div className="min-h-full flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-xl font-semibold">
                        Kodex mini
                    </h1>

                    <p className="text-slate-500 mt-1">
                        How can I help you?
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-6">
            {messages.map((message) => (
                console.log("message", message),
                <MessageBubble
                    key={message._id}
                    role={message.role}
                    content={message.content}
                />
            ))}
            {isLoading && <TypingLoader />}
        </div>
    );
}

export default MessageArea;