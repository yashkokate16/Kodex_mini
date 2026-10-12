import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FileCode2,
  Copy,
  Check,
  Files,
  PanelRightClose,
  PanelRightOpen,
  Code2,
} from "lucide-react";

export default function Artifact() {
  const [collapsed, setCollapsed] = useState(true);
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
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  // Collapsed panel
  if (collapsed) {
    return (
      <div className="flex h-full items-start justify-center bg-[#171717] p-3 text-[#ececec]">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          title="Show generated files"
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-gray-300 transition hover:bg-white/[0.09] hover:text-white"
        >
          <PanelRightOpen size={16} />
          <span>Artifacts</span>
          {files.length > 0 && (
            <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-xs">
              {files.length}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <aside className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden bg-[#171717] text-[#ececec]">
      {/* Header */}
      <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-white/10 px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.07]">
            <Files size={17} className="text-gray-300" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold">
              Artifacts
            </h2>
            <p className="text-[11px] text-gray-500">
              {files.length} {files.length === 1 ? "file" : "files"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(true)}
          title="Collapse artifacts"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <PanelRightClose size={17} />
        </button>
      </header>

      {files.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Code2 size={22} className="text-gray-400" />
          </div>

          <h3 className="text-sm font-medium text-gray-200">
            No generated files yet
          </h3>

          <p className="mt-2 max-w-[220px] text-xs leading-5 text-gray-500">
            Files created by Kodex AI will appear here.
          </p>
        </div>
      ) : (
        <div className="flex min-h-0 min-w-0 flex-1">
          {/* File explorer */}
          <div className="w-[145px] shrink-0 overflow-y-auto border-r border-white/10 p-2">
            <p className="mb-2 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              Files
            </p>

            {files.map((file, index) => {
              const isSelected =
                selectedFile?.path === file.path;

              return (
                <button
                  key={file.path ?? `${file.filename}-${index}`}
                  type="button"
                  onClick={() => {
                    setSelectedPath(file.path);
                    setCopied(false);
                  }}
                  title={file.path}
                  className={`mb-1 flex w-full min-w-0 items-start gap-2 rounded-lg px-2 py-2.5 text-left text-xs transition ${
                    isSelected
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/[0.05] hover:text-gray-200"
                  }`}
                >
                  <FileCode2
                    size={15}
                    className={`mt-0.5 shrink-0 ${
                      isSelected
                        ? "text-gray-200"
                        : "text-gray-500"
                    }`}
                  />

                  <span className="min-w-0 break-words">
                    {file.filename || file.path}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Code viewer */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#212121]">
            <div className="flex min-h-[48px] shrink-0 items-center justify-between gap-2 border-b border-white/[0.08] px-3">
              <div className="flex min-w-0 items-center gap-2">
                <FileCode2
                  size={14}
                  className="shrink-0 text-gray-500"
                />
                <span
                  className="truncate text-xs text-gray-300"
                  title={selectedFile?.path}
                >
                  {selectedFile?.filename || "Select a file"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!selectedFile}
                title={copied ? "Copied!" : "Copy code"}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="min-h-0 min-w-0 flex-1 overflow-auto">
              <pre className="min-h-full w-max min-w-full p-4 font-mono text-[12px] leading-[1.8] text-[#d4d4d4] selection:bg-white/20">
                <code>{selectedFile?.content ?? ""}</code>
              </pre>
            </div>

            <footer className="flex h-8 shrink-0 items-center justify-between border-t border-white/[0.06] px-3 text-[10px] text-gray-500">
              <span>Code Viewer</span>
              <span>UTF-8</span>
            </footer>
          </div>
        </div>
      )}
    </aside>
  );
}
