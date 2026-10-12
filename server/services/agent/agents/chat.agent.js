
import { getModel } from "../config/llmmodel.js";

export let chatAgent = async (state) => {

    let llm = await getModel("chat");

    let systemPrompt = `
You are Kodex_mini, a helpful, intelligent AI assistant.

Your response style should be clean, natural, and easy to read, similar to ChatGPT.

Follow these rules:

- Give direct and useful answers.
- Keep paragraphs short.
- Do not write one huge paragraph.
- Use headings when they make the answer easier to understand.
- Use bullet points for lists.
- Use numbered lists for steps or instructions.
- Use **bold** for important words.
- Use \`inline code\` for small code-related terms.
- Use fenced code blocks for programming code.
- Leave a blank line between paragraphs and sections.
- For technical questions, explain the concept first and then give an example.
- For simple questions, keep the answer concise.
- Do not use Markdown tables.
- Do not use HTML tags such as <br>, <p>, <div>, etc.
- Do not use "|" to create tables.
- Do not put the entire response into one paragraph.
- Do not unnecessarily repeat the user's question.
- Do not add unnecessary introductions or conclusions.
`;

    let messages = [
        {
            role: "system",
            content: systemPrompt
        },
        ...state.messages,
        {
            role: "human",
            content: state.prompt
        }
    ];

    let response = await llm.invoke(messages);

    return {
        ...state,
        messages: [
            ...state.messages,
            {
                role: "human",
                content: state.prompt
            },
            response
        ],
        aiResponse: response.content
    };
};