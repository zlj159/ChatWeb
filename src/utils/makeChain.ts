import {ChatPromptTemplate} from "@langchain/core/prompts";
import {InMemoryChatMessageHistory} from "@langchain/core/chat_history";
import {ChatOpenAI} from "@langchain/openai";
import {RunnablePassthrough, RunnableSequence, RunnableWithMessageHistory} from "@langchain/core/runnables";
import {BaseMessage} from "@langchain/core/messages";

const CHAT_BOT_PROMPT = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are a helpful assistant who remembers all details the user shares with you.`,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
]);
const messageHistories: Record<string, InMemoryChatMessageHistory> = {};
const filterMessages = ({ chat_history }: { chat_history: BaseMessage[] }) => {
    return chat_history.slice(-10);
};
const makeChatChain = (onTokenStream?: (token: string) => void) => {
    const model = new ChatOpenAI({apiKey: "d1bf9bc27334a7c6c9308d3d8d69d24e", azureOpenAIBasePath: "https://flag.smarttrot.com/v1/"})
    const chatChain = RunnableSequence.from([
        CHAT_BOT_PROMPT,
        model,
    ])
    const withMessagesChain = new RunnableWithMessageHistory({
        runnable: chatChain,
        getMessageHistory: async (sessionId) => {
            if (!messageHistories[sessionId]) {
                messageHistories[sessionId] = new InMemoryChatMessageHistory()

            }
            return messageHistories[sessionId]
        },
        inputMessagesKey: "input",
        historyMessagesKey: "chat_history",
    });
    return withMessagesChain;
}
export default makeChatChain;