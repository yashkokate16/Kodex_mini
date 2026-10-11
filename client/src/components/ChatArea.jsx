import NavBar from './NavBar.jsx'
import MessageArea from './MessageArea.jsx'
import ChatInput from './ChatInput.jsx'
import {useSelector} from "react-redux";
import { useEffect } from 'react';
import {getMessages} from "../redux/messageThunk.js";
import { useDispatch } from 'react-redux';


// function ChatArea() {

//   let {selectedConversation} = useSelector((state) => state.conversation)
  
//   let dispatch = useDispatch()

//   useEffect(() => {
//         if (selectedConversation?._id) {
//             dispatch(getMessages(selectedConversation._id));
//         }
//     }, [selectedConversation, dispatch]);


//   return (
//     <div className="w-full h-full bg-[#0d0f14] flex flex-col py-2">
//       <NavBar/>
//       <MessageArea />
//       <ChatInput />
      
//     </div>
//   )
// }


function ChatArea() {
    const { selectedConversation } = useSelector(
        (state) => state.conversation
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedConversation?._id) {
            dispatch(getMessages(selectedConversation._id));
        }
    }, [selectedConversation, dispatch]);

    return (
       <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden bg-[#0d0f14]">

            {/* Navbar */}
            <NavBar />

            {/* ONLY MESSAGE AREA SCROLLS */}
            <div className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <MessageArea />
            </div>

            {/* Input stays at bottom */}
            <ChatInput />

        </div>
    );
}

export default ChatArea


