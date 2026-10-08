import React, { useState } from "react";
import { Paperclip, Mic, Send, Globe, Zap, MessageSquare, Code2, FileText } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { sendMessage, getMessages } from "../redux/messageThunk.js";
import {createConversation} from "../redux/conversationThunk.js";
import { setSelectedConversation } from "../redux/conversationSlice.js";
function ChatInput() {
    const [value, setValue] = useState("");
    let [selectedAgent, setSelectedAgent] = useState("auto");

    const canSend = value.trim().length > 0;

    let dispatch = useDispatch()

    let {selectedConversation} = useSelector((state) => state.conversation)

    let handleSendMessage = async() => {

        let conversation  = selectedConversation;

        if(!conversation?._id){
            let data = dispatch(createConversation())
            dispatch(setSelectedConversation(data))
        }

        

        console.log("SELECTED AGENT:", selectedAgent)
      console.log("SELECTED CONVERSATION:", selectedConversation);
        let data = {
            prompt: value.trim(),
            conversationId: selectedConversation._id,
            agent:selectedAgent
        };
        
    try {
        await dispatch(sendMessage(data));
        // console.log("data", data);
        await dispatch(getMessages(selectedConversation._id));
    } catch (error) {
        console.error("Error sending message:", error);
    }

    setValue("");
};
    let handleKeyDown = (e) =>{
        if(e.key === "Enter" && !e.shiftKey && canSend){
            e.preventDefault();
            handleSendMessage()
        }
    }

    let agents = [
        {
            id:"auto",
            icon: Zap,
            label: "Auto",
        },
        {
            id:"chat",
            icon: MessageSquare,
            label: "Chat",
        }, 
        {
            id:"search",
            icon: Globe,
            label: "Search",    
        },
        {
            id:"coding",
            icon: Code2,
            label: "Code",
        },
        {
            id:"pdf",
            icon: FileText,
            label: "PDF",
        }
    ]

    return (
        <div className="w-full shrink-0 px-3 md:px-5 py-3 bg-[#0d0f14] border-t border-white/[0.06] text-white">



            <div className="max-w-4xl mx-auto flex flex-col gap-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2.5 focus-within:border-white/[0.15] transition-colors">

            <div className="flex w-[80%] gap-2 p-2 text-sm text-slate overflow-auto scrollbar-width-none [&::-webkit-scrollbar]:hidden">
               {
                agents.map((agent, i) => {
                    let isActive = selectedAgent === agent.id 
                    let Icon = agent.icon
                    return (
                            <div key={i} className={`p-2 rounded-lg cursor-pointer flex items-center justify-center gap-1 ${isActive ? 'bg-white/[0.05] border border-white/[0.06]' : 'hover:bg-white/[0.08]'} `} onClick={() => setSelectedAgent(agent.id)}>
                                <Icon size={16}  />
                                {agent.label}
                            </div>
                    )
                 })
               }
            
            </div>
 
                {/* Textarea */}
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask anything..."
                    className="
                        w-full
                        bg-transparent
                        outline-none
                        resize-none
                        text-sm
                        text-slate-200
                        placeholder:text-slate-600
                        leading-relaxed
                        min-h-[28px]
                        max-h-32
                        overflow-y-auto
                        scrollbar-width-none
                        [&::-webkit-scrollbar]:hidden
                    "
                />

                {/* Bottom controls */}
                <div className="flex items-center justify-between">

                    {/* Left buttons */}
                    <div className="flex items-center gap-1">

                        <button
                            type="button"
                            className="
                                w-8 h-8
                                flex items-center justify-center
                                rounded-lg
                                text-slate-500
                                hover:text-slate-300
                                hover:bg-white/[0.06]
                                transition-colors
                            "
                            title="Attach file"
                        >
                            <Paperclip size={17} />
                        </button>

                        <button
                            type="button"
                            className="
                                w-8 h-8
                                flex items-center justify-center
                                rounded-lg
                                text-slate-500
                                hover:text-slate-300
                                hover:bg-white/[0.06]
                                transition-colors
                            "
                            title="Voice input"
                        >
                            <Mic size={17} />
                        </button>

                    </div>

                    {/* Send button */}
                    <button onClick={handleSendMessage}
                        type="button"
                        disabled={!canSend}
                        className={`
                            h-8 px-3
                            flex items-center justify-center gap-1.5
                            rounded-lg
                            text-sm font-medium
                            transition-all duration-150
                            ${
                                canSend
                                    ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                                    : "bg-white/[0.05] text-slate-600 cursor-not-allowed"
                            }
                        `}
                    >
                        <Send size={15} />
                        Send
                    </button>

                </div>
            </div>

            <p className="text-center text-[11px] text-slate-600 mt-2">
                Kodex_mini can make mistakes. Check important information.
            </p>

        </div>
    );
}

export default ChatInput;