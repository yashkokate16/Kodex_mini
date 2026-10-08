import React from 'react'
import { useSelector } from 'react-redux'


function NavBar() {
    const { selectedConversation } = useSelector(
        (state) => state.conversation
    );
    console.log("selectedConversation", selectedConversation);
   

    return (
        <div className="w-full h-[58px] shrink-0 bg-[#0d0f14] border-b border-white/[0.09] flex items-center px-4 text-white">
            <span className="text-sm font-medium">
                {selectedConversation?._id || "New Chat"}
            </span>
            
        </div>
    );
}

export default NavBar