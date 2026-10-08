function TypingLoader() {
    return (
        <div className="flex items-start gap-3 mb-5">
            
            {/* AI avatar */}
            <div className="w-8 h-8 shrink-0 rounded-full bg-white/[0.06] flex items-center justify-center text-xs text-slate-300">
                K
            </div>

            {/* Typing bubble */}
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.05] border border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                </div>
            </div>

        </div>
    );
}

export default TypingLoader;