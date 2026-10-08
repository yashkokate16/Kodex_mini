export let codingAgent = async (state) => {
    console.log("🔥 HELLO FROM CODING AGENT", state);

    return {
        ...state,
        aiResponse: "CODING AGENT IS WORKING"
    };
};