
import { useState } from "react";
import { useSelector } from "react-redux";
import {
    FileCode2,
    Copy,
    Check,
    Files,
    PanelRightClose,
    PanelRightOpen
} from "lucide-react";

export default function Artifact() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedPath, setSelectedPath] = useState("");
    const [copied, setCopied] = useState(false);

    const artifacts = useSelector(
        (state) => state.message.artifacts
    );

    const files = artifacts.flatMap(
        (artifact) => artifact.files ?? []
    );

    const selectedFile =
        files.find((file) => file.path === selectedPath) ??
        files[0];

    const handleCopy = async () => {
        if (!selectedFile) return;

        try {
            await navigator.clipboard.writeText(
                selectedFile.content ?? ""
            );
            setCopied(true);
        } catch (error) {
            console.error("Failed to copy code:", error);
        }
    };

    // Collapsed artifact panel
    if (collapsed) {
        return (
            <div className="flex items-start justify-center
                            bg-[#111318] p-3 text-white">
                <button
                    onClick={() => setCollapsed(false)}
                    title="Show artifacts"
                    className="flex items-center gap-2 rounded-md
                               bg-blue-500 px-3 py-2 text-sm
                               text-white hover:bg-blue-600"
                >
                    <PanelRightOpen size={16} />
                    Show Artifacts
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col min-w-0 flex-col
                        overflow-hidden bg-[#111318] text-white">

            {/* Header */}
            <div className="flex h-[58px] shrink-0 items-center
                            justify-between border-b border-white/10 px-4">
                <div className="flex items-center gap-2">
                    <Files size={18} />
                    <h2 className="text-sm font-semibold">
                        Generated Files
                    </h2>
                    <span className="text-xs text-gray-400">
                        ({files.length})
                    </span>
                </div>

                <button
                    onClick={() => setCollapsed(true)}
                    title="Collapse artifacts"
                    className="rounded-md p-2 text-gray-400
                               hover:bg-white/10 hover:text-white"
                >
                    <PanelRightClose size={17} />
                </button>
            </div>

            {files.length === 0 ? (
                <div className="flex flex-1 items-center justify-center
                                px-5 text-center text-sm text-gray-400">
                    Generated files will appear here.
                </div>
            ) : (
                <div className="flex min-h-0 min-w-0 flex-1">

                    {/* File explorer */}
                    <div className="w-[130px] shrink-0 overflow-y-auto
                                    border-r border-white/10 p-2">
                        <p className="mb-2 px-2 text-[10px] font-semibold
                                      uppercase tracking-wider text-gray-500">
                            Explorer
                        </p>

                        {files.map((file) => (
                            <button
                                key={file.path}
                                onClick={() => {
                                    setSelectedPath(file.path);
                                    setCopied(false);
                                }}
                                title={file.path}
                                className={`mb-1 flex w-full items-start gap-2
                                    rounded-md px-2 py-2 text-left text-xs
                                    ${
                                        selectedFile?.path === file.path
                                            ? "bg-blue-500/15 text-blue-300"
                                            : "text-gray-300 hover:bg-white/5"
                                    }`}
                            >
                                <FileCode2
                                    size={14}
                                    className="mt-0.5 shrink-0"
                                />
                                <span className="break-all">
                                    {file.filename}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Code viewer */}
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                        <div className="flex min-h-[42px] shrink-0
                                        items-center justify-between gap-2
                                        border-b border-white/10 px-3">
                            <span
                                className="truncate text-xs text-gray-300"
                                title={selectedFile?.path}
                            >
                                {selectedFile?.filename}
                            </span>

                            <button
                                onClick={handleCopy}
                                title="Copy code"
                                className="shrink-0 rounded-md p-2
                                           text-gray-400 hover:bg-white/10
                                           hover:text-white"
                            >
                                {copied ? (
                                    <Check size={15} />
                                ) : (
                                    <Copy size={15} />
                                )}
                            </button>
                        </div>

                        <div className="min-h-0 min-w-0 flex-1 overflow-auto">
                            <pre className="w-max min-w-full p-3
                                            text-xs leading-6 text-gray-200">
                                <code>
                                    {selectedFile?.content ?? ""}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
