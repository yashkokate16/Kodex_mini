// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";


// function MessageBubble({ role, content }) {
//     const isUser = role === "user";

//     return (
//         <div
//             className={`w-full flex mb-4 ${
//                 isUser ? "justify-end" : "justify-start"
//             }`}
//         >
//             <div
//                 className={`
//                     max-w-[75%] px-4 py-3 rounded-2xl
//                     text-sm leading-relaxed
//                     ${
//                         isUser
//                             ? "bg-blue-500 text-white rounded-br-md"
//                             : "bg-white/[0.05] border border-white/[0.06] text-slate-200 rounded-bl-md"
//                     }
//                 `}
//             >
//                 {content}
//             </div>
//         </div>
//     );
// }

// export default MessageBubble;



import ReactMarkdown from "react-markdown";

function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`w-full flex mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`text-sm leading-7 ${
          isUser
            ? "max-w-[75%] bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-md"
            : "max-w-[85%] text-slate-200"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">
            {content}
          </div>
        ) : (
          <div className="max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-semibold text-white mt-6 mb-3">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-white mt-5 mb-3">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-4 last:mb-0">
                    {children}
                  </p>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="text-slate-300">
                    {children}
                  </em>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-1">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li>{children}</li>
                ),

                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 rounded bg-white/[0.08] text-blue-300 text-[13px]">
                    {children}
                  </code>
                ),

                pre: ({ children }) => (
                  <pre className="my-4 p-4 rounded-xl bg-[#16181d] border border-white/[0.08] overflow-x-auto">
                    {children}
                  </pre>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-white/20 pl-4 my-4 text-slate-400">
                    {children}
                  </blockquote>
                ),

                hr: () => (
                  <hr className="my-6 border-white/[0.08]" />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;