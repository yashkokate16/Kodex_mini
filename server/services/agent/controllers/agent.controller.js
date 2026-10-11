// import axios from "axios";
// import { graph } from "../graph/graph.js";

// export let agent = async (req, res) =>{
//    try{
//     let {prompt, conversationId} = req.body



//    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, 
//     {conversationId, role:"user", content:prompt}
//    )

//    let result = await graph.invoke({
//     prompt,conversationId,agent

//    },
//    {
//       configurable: {
//          thread_id: conversationId
//       }
//    }
// )
//    let response = result.aiResponse;

//     await axios.post(`${process.env.CHAT_SERVICE}/save-message`, 
//     {conversationId, role:"assistant", content:response}
//    )
//    return res.status(200).json({
//       message: "Message processed successfully",
//       response})

//    } catch(error) {
//     console.error(error);
//     return res.status(500).json({error: "An error occurred while processing the request."});
//    }
// } 




import axios from "axios";
import { graph } from "../graph/graph.js";

export let agent = async (req, res) => {
  try {
    let { prompt, conversationId, agent: selectedAgent } = req.body;

    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt
    });

    let result = await graph.invoke(
      {
        prompt,
        conversationId,
        agent: selectedAgent
      },
      {
        configurable: {
          thread_id: conversationId
        }
      }
    );

    let response = result.aiResponse;

    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
      artifacts: result.artifacts ?? []
    });

    console.log("Artifacts saved:", result.artifacts);
    return res.status(200).json({
      message: "Message processed successfully",
      response,
      artifacts: result.artifacts ?? []
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while processing the request."
    });
  }
};
