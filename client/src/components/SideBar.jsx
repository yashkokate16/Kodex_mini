import { PanelLeft, PenBoxIcon, Plus, MessageSquare, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createConversation, getConversations } from "../redux/conversationThunk.js";
import { setSelectedConversation } from "../redux/conversationSlice.js";
import { LogoutUser } from "../redux/userThunk.js";
function Sidebar() {

    let [collapsed, setCollapsed] = useState(true) 

    let dispatch = useDispatch()
    let {conversations, selectedConversation } = useSelector((state) => state.conversation)
    let {user} = useSelector((state) => state.user)


    

    
    useEffect(() => {
        dispatch(getConversations())
    },[dispatch])

   let handleCreateConversation = async () => {
    await dispatch(createConversation());
    dispatch(getConversations());
}

    let handleLogout = () => {
        dispatch(LogoutUser())
        dispatch(setUser(null))
    }






if (collapsed) {
    return (
        <div className="w-[58px] h-screen shrink-0 flex flex-col items-center bg-[#0d0f14] border-r border-white/[0.06]">

            {/* Top */}
            <div className="flex flex-col items-center gap-2 pt-4">

                {/* Expand Sidebar */}
                <button
                    onClick={() => setCollapsed(prev => !prev)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg
                    text-slate-500
                    hover:text-slate-200
                    hover:bg-white/[0.06]
                    transition-colors duration-150"
                    title="Expand sidebar"
                >
                    <PanelLeft size={18} />
                </button>

                {/* New Chat */}
                <button
                    onClick={handleCreateConversation}
                    className="w-8 h-8 flex items-center justify-center rounded-lg
                    text-slate-500
                    hover:text-slate-200
                    hover:bg-white/[0.06]
                    transition-colors duration-150"
                    title="New chat"
                >
                    <Plus size={19} />
                </button>

            </div>

            {/* Conversations */}
            <div className="flex-1 w-full overflow-y-auto px-2 mt-4 scrollbar-width-none [&::-webkit-scrollbar]:hidden">

                <div className="flex flex-col items-center gap-1">

                    {conversations.map((conversation) => {

                        const isActive =
                            selectedConversation?._id === conversation._id;

                        return (
                            <button
                                key={conversation._id}
                                onClick={() =>
                                    dispatch(
                                        setSelectedConversation(conversation)
                                    )
                                }
                                className={`px-4 py-2 hover:bg-white/[0.05] flex items-center gap-3 m-1.5 rounded-lg cursor-pointer ${
    isActive ? "bg-white/[0.05]" : ""
}`}
                                title={conversation._id || "Conversation"}
                            >
                                <MessageSquare size={17} />
                            </button>
                        );
                    })}

                </div>

            </div>

            <div>
                        {user? (
                            <div className="text-sm  text-slate-500 flex items-center p-3 gap-5 cursor-pointer hover:bg-white/[0.05] rounded-lg">
                              
                                <User size={18} /> 
                            </div>
                        ) : (
                            <div>
                                Guest
                            </div>
                        )} 
                    </div>

        </div>
    );
}


console.log("conversations", conversations)

  return (
    <div className="w-[270px] h-full shrink-0 bg-[#0d0f14] border-r border-white/[0.06]">
      <div className="flex flex-col h-full">

        {/* Header */}
        <div className="flex items-center px-4 py-4 border-b border-white/[0.06]">

          {/* Sidebar toggle */}
          <button onClick={() => setCollapsed(prev => !prev)}
            className="flex items-center justify-center w-7 h-7 rounded-lg
            text-slate-500 hover:text-slate-200 hover:bg-white/[0.05]
            transition-colors duration-150"
          >
            <PanelLeft size={18} />
          </button>

          {/* Right section */}
          <div className="flex items-center gap-2 ml-3 flex-1">

            {/* App name */}
            <span className="text-sm font-medium text-white">
              Kodex_mini
            </span>

            {/* Free badge */}
            <span className="text-[11px] font-medium text-indigo-400
              bg-indigo-500/10 border border-indigo-500/20
              px-2 py-0.5 rounded-full tracking-wide">
              Free
            </span>

            {/* Edit button */}
            <button
              className="ml-auto flex items-center justify-center
              w-7 h-7 rounded-lg text-slate-500
              hover:text-slate-200 hover:bg-white/[0.05]
              transition-colors duration-150"
            >
              <PenBoxIcon size={16} />
            </button>

          </div>
          

        </div>

        <div className="px-4 pt-3 pb-1">
            <button onClick={handleCreateConversation}
            className="text-sm flex items-center justify-center gap-3 font-medium cursor-pointer text-white-400 hover:text-black bg-blue-400 hover:bg-blue-300 w-full py-2 px-3 rounded-lg transition-colors duration-150   ">
                <Plus  size={16}/>
                New Chat
            </button>
                
          </div>
          {conversations.length === 0? (
            <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
              No conversations yet. Start a new chat!
            </div>
          ): (
            <div className="flex items-center text-slate-500 text-lg px-4 py-2">
                Recents
            </div>
          )}
          <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbat-width:none] [&::-webkit-scrollbar]:hidden">
         

            {
                conversations.map((conversation, i) => {
                    let isActive  = selectedConversation?._id == conversation._id;
                    return (
                        <div onClick={() => dispatch(setSelectedConversation(conversation)) } key={i}
                            className={`px-4 py-2 hover:bg-white/[0.05] flex items-center gap-3 m-1.5 rounded-lg cursor-pointer  flex-1 overflow-y-auto px-2.5 pb-2 [scrollbat-width:none] [&::-webkit-scrollbar]:hidden ${isActive ? 'bg-white/[0.05]' : ''}`}
                        > <MessageSquare color="white" size={16} />
                            <div className="text-sm text-white">
                                {conversation?.title || "new"}
                            </div>
                        </div>
                    )   
                })
            }
            
            </div>

            <div>
                    <div>
                        {user? (
                            <div className="text-sm  text-slate-500 flex items-center p-3 gap-5 cursor-pointer hover:bg-white/[0.05] rounded-lg">
                              
                                <User size={18} />
                                {user.name} 
                                <div className="ml-auto  p-2 ">
                                    <button className="hover:text-red-500"
                                    onClick={handleLogout}
                                    >
                                        <LogOut size={18} /> 
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                Guest
                            </div>
                        )} 
                    </div>
                </div>

      </div>
    </div>
  );

  
}

export default Sidebar;