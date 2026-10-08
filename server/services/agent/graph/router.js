import { getModel } from "../config/llmmodel.js";



export let router = async (state) => {

   if(state.agent !== "auto"){
      return {
    ...state,
    agent: state.agent
}
   } 
     
let llm = await getModel("router")

console.log("ROUTER AGENT:", state.agent)

  const prompt = `
You are a routing agent for an AI assistant.

Your task is to classify the user's request and select the ONE agent that is best suited to handle it.

Available agents:

1. chat
   - General conversation
   - Casual questions
   - Explanations that do not require web search, coding, PDFs, images, or PowerPoint

2. search
   - Questions that require current, real-time, or web-based information
   - News, latest information, websites, prices, current events, etc.

3. coding
   - Writing, debugging, explaining, or reviewing code
   - Programming concepts
   - Software development and technical implementation

4. pdf
   - Creating, reading, analyzing, summarizing, or modifying PDF documents

5. vision
   - Understanding or analyzing images
   - Image generation, editing, or visual tasks

6. ppt
   - Creating, reading, analyzing, or modifying PowerPoint presentations

Rules:
- Return ONLY ONE agent name.
- The output must be exactly one of:
  chat
  search
  coding
  pdf
  vision
  ppt
- Do not return explanations.
- Do not return JSON.
- Do not return markdown.
- Choose the agent based on the user's primary intent.
- If the request involves writing or debugging code, choose coding.
- If the request requires current web information, choose search.
- If the request involves an image, choose vision.
- If the request involves a PDF, choose pdf.
- If the request involves PowerPoint, choose ppt.
- Otherwise, choose chat.

-
User request:
${state.prompt}
`;
let response = await llm.invoke(prompt);

// state.agent = response.text.trim().toLowerCase();
//

return {
    ...state,
    agent:response.content.trim().toLowerCase()

}





}




