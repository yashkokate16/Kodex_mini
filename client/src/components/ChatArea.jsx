import NavBar from "./NavBar.jsx";
import MessageArea from "./MessageArea.jsx";
import ChatInput from "./ChatInput.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMessages } from "../redux/messageThunk.js";
import { FileText, Download, ExternalLink } from "lucide-react";

function ChatArea() {
    const { selectedConversation } = useSelector(
        (state) => state.conversation
    );

    const pdf = useSelector(
        (state) => state.message.latestPdf
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedConversation?._id) {
            dispatch(getMessages(selectedConversation._id));
        }
    }, [selectedConversation, dispatch]);

    return (
        <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden bg-[#212121] text-[#ececec]">
            {/* Top navigation */}
            <div className="shrink-0">
                <NavBar />
            </div>

            {/* Conversation area */}
            <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#565656_transparent]">
                    <div className="mx-auto min-h-full w-full max-w-3xl px-4 pb-6 sm:px-6">
                        <MessageArea />
                    </div>
                </div>

                {/* PDF download card */}
                {pdf?.url && (
                    <div className="shrink-0 px-4 pb-3 sm:px-6">
                        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-2xl border border-white/10 bg-[#2f2f2f] p-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                <FileText
                                    size={22}
                                    className="text-gray-200"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-white">
                                    {pdf.filename || "Generated PDF"}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    PDF document · Ready to download
                                </p>
                            </div>

                            <a
                                href={pdf.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Download generated PDF"
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200"
                            >
                                <Download size={16} />
                                <span className="hidden sm:inline">
                                    Download
                                </span>
                                <ExternalLink
                                    size={14}
                                    className="hidden sm:block"
                                />
                            </a>
                        </div>
                    </div>
                )}

                {/* Input area */}
                <div className="shrink-0 bg-[#212121] px-3 pb-3 pt-2 sm:px-6">
                    <div className="mx-auto w-full max-w-3xl">
                        <ChatInput />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ChatArea;
