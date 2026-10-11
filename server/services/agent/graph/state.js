import { Annotation, MessagesAnnotation  } from "@langchain/langgraph";


export let agentState = Annotation.Root({
...MessagesAnnotation.spec,

    prompt:Annotation(),
    aiResponse:Annotation(),
    agent:Annotation(),
    conversationId:Annotation(),
    artifacts:Annotation(),
})

