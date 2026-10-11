import { getModel } from "../config/llmmodel.js";


export let codingAgent = async (state) => {
    console.log("🔥 HELLO FROM CODING AGENT", state);

    let llm = await getModel("coding")

    let intentLLm = await getModel("intent")

    let intentResponse = await intentLLm.invoke(`
        You are a intent Classifier.
        
        Return only one of the these values.
        
        CODE_GENERATION
        CODE_DEBUGGING
        CODE_REVIEW
        CODE_EXPLANATION
        CONVERSION
        OPTIMIZATION
        DOCUMENTATION
        
        
        User Request:${state.prompt}`
    )

    let intent = intentResponse.content.trim();
    console.log("INTENT:", intent);

    if(intent === "CODE_GENERATION") {
        let prompt = `
You are Kodex_mini, an expert software developer and code generation assistant.

Your task is to generate clean, correct, maintainable, and runnable code based on the user's requirements.

USER REQUEST:
${state.prompt}

INSTRUCTIONS:

1. Understand the user's requirements before generating code.
2. Follow the programming language, framework, and tech stack specified by the user.
3. Generate complete code, not pseudocode or incomplete snippets, unless the user explicitly requests a snippet.
4. Follow best practices for naming, structure, error handling, security, and performance.
5. Include all necessary imports, exports, and relevant configuration.
6. Do not invent library APIs or claim code has been tested unless it actually has.
7. Avoid unnecessary files and dependencies.

FILE HANDLING RULES:

1. Decide whether the solution requires one file or multiple files.
2. If only one file is required, return that file's complete content.
3. If multiple files are required, return EVERY required file.
4. For each file, include:
   - Its exact filename.
   - Its relative path from the project root.
   - Its complete content.
5. Do not omit imports, exports, functions, styles, or other required code.
6. Do not use placeholders such as "// remaining code here" or "...".
7. If an existing project structure is provided, respect it and modify only the necessary files.
8. If the user's request involves modifying existing code, clearly identify which files need to be changed and return their complete updated contents.
9. Include package.json changes or installation commands when new dependencies are required.
10. If additional files are needed for the solution to work, include them too.
11. Do not generate unrelated files or duplicate existing functionality.

RESPONSE FORMAT:

Start with a brief explanation of the solution.

For each required file, use this format:


RESPONSE FORMAT:

Return ONLY valid JSON. Do not include Markdown fences or explanations outside the JSON.

Use this structure:

{
  "explanation": "Brief explanation of the solution",
  "files": [
    {
      "filename": "Login.jsx",
      "path": "src/components/Login.jsx",
      "content": "Complete source code as a string"
    }
  ],
  "dependencies": [],
  "commands": []
}

Rules:
- Include every required file in the files array.
- The content field must contain the complete source code.
- Escape newlines, quotation marks, and backslashes correctly for valid JSON.
- Do not omit required files.
- If only one file is needed, return one file.
- Return valid JSON only.

`;
let response = await llm.invoke(prompt);
// console.log("CODING AGENT RESPONSE:", response.content);

let rawContent = response.content.trim();

// Remove Markdown code fences if the LLM returns them.
rawContent = rawContent
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

let content;

try {
    content = JSON.parse(rawContent);
} catch (error) {
    console.error("Invalid JSON from coding model:", rawContent);
    throw new Error("Coding model returned invalid JSON");
}

console.log("CODING AGENT RESPONSE:", content);
console.log("Explanation:", content.explanation);
console.log("Files:", content.files);

return {
    ...state,
    aiResponse: content.explanation
        ? `Code generated successfully. ${content.explanation}`
        : "Code generated successfully. Open Artifacts to view your files.",
    artifacts: [
        {
            id: Date.now(),
            type: "Project",
            files: content.files ?? []
        }
    ]
};
}



}