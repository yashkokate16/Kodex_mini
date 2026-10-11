export let searchAgent = async (state) => {
    console.log("🔥 HELLO FROM SEARCH AGENT", state);

    return {
        ...state,
        aiResponse: "SEARCH AGENT IS WORKING"
    };
}; 