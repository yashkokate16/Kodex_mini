import React from "react";
import { useSelector } from "react-redux";
import { Sparkles, ChevronDown, PanelRight } from "lucide-react";

function NavBar() {
    const { selectedConversation } = useSelector(
        (state) => state.conversation
    );

    // const title =
    //     selectedConversation?.title ||
    //     selectedConversation?.name ||
    //     selectedConversation?._id ||
    //     "New Chat";

    return (
        <header className="flex h-[60px] w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#212121] px-4 text-[#ececec] sm:px-6">
            {/* Left: conversation title */}
            <div className="flex min-w-0 items-center gap-2">
                <h1 className="truncate text-base font-semibold tracking-tight">
                    {selectedConversation?._id || "New Chat"}
                </h1>

                <ChevronDown
                    size={16}
                    className="shrink-0 text-gray-400"
                />
            </div>

            {/* Right: model indicator */}
            <button
                type="button"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/[0.08]"
                title="Kodex AI"
            >
                <Sparkles size={14} className="text-gray-300" />
                <span className="hidden sm:inline">Kodex AI</span>
            </button>
        </header>
    );
}

export default NavBar;
