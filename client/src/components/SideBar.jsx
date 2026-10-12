
import {
    PanelLeft,
    PenBox,
    Plus,
    MessageSquare,
    UserRound,
    LogOut,
    Sparkles,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    createConversation,
    getConversations,
} from "../redux/conversationThunk.js";

import {
    setSelectedConversation,
} from "../redux/conversationSlice.js";

import { LogoutUser } from "../redux/userThunk.js";

function Sidebar() {
    const [collapsed, setCollapsed] = useState(true);

    const dispatch = useDispatch();

    const {
        conversations = [],
        selectedConversation,
        isCreating,
    } = useSelector((state) => state.conversation);

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getConversations());
    }, [dispatch]);

    const handleCreateConversation = async () => {
        await dispatch(createConversation());
    };

    const handleLogout = () => {
        dispatch(LogoutUser());
    };

    const handleSelectConversation = (conversation) => {
        dispatch(setSelectedConversation(conversation));
    };

    // Collapsed sidebar
    if (collapsed) {
        return (
            <aside className="flex h-full w-[60px] shrink-0 flex-col items-center border-r border-white/10 bg-[#171717] text-[#ececec]">
                <div className="flex w-full flex-col items-center gap-2 px-2 pt-3">
                    <button
                        onClick={() => setCollapsed(false)}
                        title="Expand sidebar"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-300 transition hover:bg-white/10"
                    >
                        <PanelLeft size={20} />
                    </button>

                    <button
                        onClick={handleCreateConversation}
                        disabled={isCreating}
                        title="New chat"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
                    >
                        <PenBox size={19} />
                    </button>
                </div>

                <div className="mt-5 flex w-full flex-1 flex-col items-center gap-1 overflow-y-auto px-2">
                    {conversations.map((conversation) => {
                        const isActive =
                            selectedConversation?._id === conversation._id;

                        return (
                            <button
                                key={conversation._id}
                                onClick={() =>
                                    handleSelectConversation(conversation)
                                }
                                title={conversation.title || "Conversation"}
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                                    isActive
                                        ? "bg-white/15 text-white"
                                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                <MessageSquare size={18} />
                            </button>
                        );
                    })}
                </div>

                <div className="mb-3 mt-3">
                    <button
                        onClick={user ? handleLogout : undefined}
                        title={user?.name || "Guest"}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#303030] text-gray-200 transition hover:bg-white/15"
                    >
                        <UserRound size={19} />
                    </button>
                </div>
            </aside>
        );
    }

    // Expanded sidebar
    return (
        <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-white/10 bg-[#171717] text-[#ececec]">
            {/* Header */}
            <div className="flex h-[60px] shrink-0 items-center justify-between px-3">
                <div className="flex min-w-0 items-center gap-2.5 px-1">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <Sparkles size={17} />
                    </div>

                    <span className="truncate text-[15px] font-semibold tracking-tight">
                        Kodex_mini
                    </span>
                </div>

                <button
                    onClick={() => setCollapsed(true)}
                    title="Collapse sidebar"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                    <PanelLeft size={19} />
                </button>
            </div>

            {/* New Chat */}
            <div className="px-3 pb-5 pt-2">
                <button
                    onClick={handleCreateConversation}
                    disabled={isCreating}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200 transition hover:bg-white/10 disabled:opacity-50"
                >
                    <PenBox size={18} />
                    <span>{isCreating ? "Creating..." : "New chat"}</span>
                    <Plus size={16} className="ml-auto text-gray-500" />
                </button>
            </div>

            {/* Conversation list */}
            <div className="mb-2 px-4">
                <p className="text-xs font-medium text-gray-500">
                    Your chats
                </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3 [scrollbar-width:thin] [scrollbar-color:#454545_transparent]">
                {conversations.length === 0 ? (
                    <p className="px-3 py-4 text-sm leading-5 text-gray-500">
                        Your conversations will appear here.
                    </p>
                ) : (
                    <div className="flex flex-col gap-1">
                        {conversations.map((conversation) => {
                            const isActive =
                                selectedConversation?._id === conversation._id;

                            return (
                                <button
                                    key={conversation._id}
                                    onClick={() =>
                                        handleSelectConversation(conversation)
                                    }
                                    title={conversation.title || "New chat"}
                                    className={`flex w-full min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                        isActive
                                            ? "bg-white/10 text-white"
                                            : "text-gray-300 hover:bg-white/[0.06] hover:text-white"
                                    }`}
                                >
                                    <MessageSquare
                                        size={17}
                                        className="shrink-0 text-gray-400"
                                    />

                                    <span className="min-w-0 flex-1 truncate">
                                        {conversation.title || "New chat"}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Bottom profile */}
            <div className="shrink-0 border-t border-white/10 p-3">
                {user ? (
                    <div className="flex items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-white/[0.06]">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#343434] text-sm font-medium text-white">
                            {user.name?.charAt(0)?.toUpperCase() || (
                                <UserRound size={18} />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">
                                {user.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500">
                                Kodex account
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            title="Log out"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-red-400"
                        >
                            <LogOut size={17} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 px-2 py-2 text-sm text-gray-400">
                        <UserRound size={19} />
                        Guest
                    </div>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
