// import React, { useState } from "react";
// import { Paperclip, Mic, Send, Globe, Zap, MessageSquare, Code2, FileText } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { sendMessage, getMessages } from "../redux/messageThunk.js";
// import {createConversation} from "../redux/conversationThunk.js";
// import { setSelectedConversation } from "../redux/conversationSlice.js";
// function ChatInput() {

//     const [value, setValue] = useState("");
//     let [selectedAgent, setSelectedAgent] = useState("auto");

//     const canSend = value.trim().length > 0;

//     let dispatch = useDispatch()

//     let {selectedConversation} = useSelector((state) => state.conversation)

//     let handleSendMessage = async() => {

//         let conversation  = selectedConversation;

//         if(!conversation?._id){
//             let data = dispatch(createConversation())
//             dispatch(setSelectedConversation(data))
//         }

        

//         console.log("SELECTED AGENT:", selectedAgent)
//       console.log("SELECTED CONVERSATION:", selectedConversation);
//         let data = {
//             prompt: value.trim(),
//             conversationId: selectedConversation._id,
//             agent:selectedAgent
//         };
        
//     try {
//         await dispatch(sendMessage(data));
//         // console.log("data", data);
//         await dispatch(getMessages(selectedConversation._id));
//     } catch (error) {
//         console.error("Error sending message:", error);
//     }

//     setValue("");
// };
//     let handleKeyDown = (e) =>{
//         if(e.key === "Enter" && !e.shiftKey && canSend){
//             e.preventDefault();
//             handleSendMessage()
//         }
//     }

//     let agents = [
//         {
//             id:"auto",
//             icon: Zap,
//             label: "Auto",
//         },
//         {
//             id:"chat",
//             icon: MessageSquare,
//             label: "Chat",
//         }, 
//         {
//             id:"search",
//             icon: Globe,
//             label: "Search",    
//         },
//         {
//             id:"coding",
//             icon: Code2,
//             label: "Code",
//         },
//         {
//             id:"pdf",
//             icon: FileText,
//             label: "PDF",
//         }
//     ]

//     return (
//         <div className="w-full shrink-0 px-3 md:px-5 py-3 bg-[#0d0f14] border-t border-white/[0.06] text-white">



//             <div className="max-w-4xl mx-auto flex flex-col gap-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2.5 focus-within:border-white/[0.15] transition-colors">

//             <div className="flex w-[80%] gap-2 p-2 text-sm text-slate overflow-auto scrollbar-width-none [&::-webkit-scrollbar]:hidden">
//                {
//                 agents.map((agent, i) => {
//                     let isActive = selectedAgent === agent.id 
//                     let Icon = agent.icon
//                     return (
//                             <div key={i} className={`p-2 rounded-lg cursor-pointer flex items-center justify-center gap-1 ${isActive ? 'bg-white/[0.05] border border-white/[0.06]' : 'hover:bg-white/[0.08]'} `} onClick={() => setSelectedAgent(agent.id)}>
//                                 <Icon size={16}  />
//                                 {agent.label}
//                             </div>
//                     )
//                  })
//                }
            
//             </div>
 
//                 {/* Textarea */}
//                 <textarea
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     rows={1}
//                     placeholder="Ask anything..."
//                     className="
//                         w-full
//                         bg-transparent
//                         outline-none
//                         resize-none
//                         text-sm
//                         text-slate-200
//                         placeholder:text-slate-600
//                         leading-relaxed
//                         min-h-[28px]
//                         max-h-32
//                         overflow-y-auto
//                         scrollbar-width-none
//                         [&::-webkit-scrollbar]:hidden
//                     "
//                 />

//                 {/* Bottom controls */}
//                 <div className="flex items-center justify-between">

//                     {/* Left buttons */}
//                     <div className="flex items-center gap-1">

//                         <button
//                             type="button"
//                             className="
//                                 w-8 h-8
//                                 flex items-center justify-center
//                                 rounded-lg
//                                 text-slate-500
//                                 hover:text-slate-300
//                                 hover:bg-white/[0.06]
//                                 transition-colors
//                             "
//                             title="Attach file"
//                         >
//                             <Paperclip size={17} />
//                         </button>

//                         <button
//                             type="button"
//                             className="
//                                 w-8 h-8
//                                 flex items-center justify-center
//                                 rounded-lg
//                                 text-slate-500
//                                 hover:text-slate-300
//                                 hover:bg-white/[0.06]
//                                 transition-colors
//                             "
//                             title="Voice input"
//                         >
//                             <Mic size={17} />
//                         </button>

//                     </div>

//                     {/* Send button */}
//                     <button onClick={handleSendMessage}
//                         type="button"
//                         disabled={!canSend}
//                         className={`
//                             h-8 px-3
//                             flex items-center justify-center gap-1.5
//                             rounded-lg
//                             text-sm font-medium
//                             transition-all duration-150
//                             ${
//                                 canSend
//                                     ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
//                                     : "bg-white/[0.05] text-slate-600 cursor-not-allowed"
//                             }
//                         `}
//                     >
//                         <Send size={15} />
//                         Send
//                     </button>

//                 </div>
//             </div>

//             <p className="text-center text-[11px] text-slate-600 mt-2">
//                 Kodex_mini can make mistakes. Check important information.
//             </p>

//         </div>
//     );
// }

// export default ChatInput;



import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paperclip,
  Mic,
  Send,
  Globe,
  Zap,
  MessageSquare,
  Code2,
  FileText,
  ChevronDown,
} from "lucide-react";

import {
  sendMessage,
  getMessages,
} from "../redux/messageThunk.js";

import {
  createConversation,
} from "../redux/conversationThunk.js";

import {
  setSelectedConversation,
} from "../redux/conversationSlice.js";

function ChatInput() {
  const [value, setValue] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("auto");
  const [sending, setSending] = useState(false);

  const dispatch = useDispatch();

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const canSend = value.trim().length > 0 && !sending;

  const agents = [
    { id: "auto", icon: Zap, label: "Auto" },
    { id: "chat", icon: MessageSquare, label: "Chat" },
    { id: "search", icon: Globe, label: "Search" },
    { id: "coding", icon: Code2, label: "Code" },
    { id: "pdf", icon: FileText, label: "PDF" },
  ];

  const handleSendMessage = async () => {
    const prompt = value.trim();

    if (!prompt || sending) return;

    setSending(true);

    try {
      let conversation = selectedConversation;

      // Create a conversation when starting a new chat.
      if (!conversation?._id) {
        conversation = await dispatch(
          createConversation()
        ).unwrap();

        dispatch(setSelectedConversation(conversation));
      }

      const data = {
        prompt,
        conversationId: conversation._id,
        agent: selectedAgent,
      };

      await dispatch(sendMessage(data)).unwrap();

      await dispatch(
        getMessages(conversation._id)
      ).unwrap();

      setValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (canSend) {
        handleSendMessage();
      }
    }
  };

  return (
    <div className="w-full shrink-0 border-t border-white/[0.06] bg-[#212121] px-3 pb-3 pt-3 text-[#ececec] sm:px-5">
      <div className="mx-auto max-w-3xl">

        {/* Input container */}
        <div className="rounded-2xl border border-white/[0.12] bg-[#303030] p-3 transition-colors focus-within:border-white/[0.22]">

          {/* Agent selector */}
          <div className="mb-3 flex min-w-0 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {agents.map((agent) => {
              const Icon = agent.icon;
              const isActive = selectedAgent === agent.id;

              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedAgent(agent.id)}
                  disabled={sending}
                  title={`${agent.label} agent`}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "border-white/[0.18] bg-white/[0.10] text-white"
                      : "border-transparent text-gray-400 hover:bg-white/[0.06] hover:text-gray-200"
                  }`}
                >
                  <Icon size={14} />
                  {agent.label}
                  {isActive && agent.id === "auto" && (
                    <ChevronDown size={12} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Textarea */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Message Kodex..."
            disabled={sending}
            className="block max-h-40 min-h-[44px] w-full resize-none overflow-y-auto bg-transparent px-1 py-2 text-sm leading-6 text-white outline-none placeholder:text-gray-400 disabled:opacity-60 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          />

          {/* Bottom controls */}
          <div className="mt-2 flex items-center justify-between">

            <div className="flex items-center gap-1">
              <button
                type="button"
                title="Attach file"
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 transition hover:bg-white/[0.10] hover:text-white"
                onClick={() => {
                  // File attachment functionality can be added here.
                }}
              >
                <Paperclip size={18} />
              </button>

              <button
                type="button"
                title="Voice input"
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 transition hover:bg-white/[0.10] hover:text-white"
                onClick={() => {
                  // Voice input functionality can be added here.
                }}
              >
                <Mic size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!canSend}
              title="Send message"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                canSend
                  ? "bg-white text-black hover:bg-gray-200"
                  : "cursor-not-allowed bg-white/[0.12] text-gray-500"
              }`}
            >
              <Send size={17} />
            </button>
          </div>
        </div>

        <p className="mt-2 text-center text-[11px] leading-4 text-gray-500">
          Kodex_mini can make mistakes. Check important information.
        </p>
      </div>
    </div>
  );
}

export default ChatInput;
