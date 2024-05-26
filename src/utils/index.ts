import {ChatPromptTemplate, MessagesPlaceholder, PromptTemplate} from "@langchain/core/prompts";
import {message} from "antd";

export async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
}

export function prettyObject(msg: any) {
    const obj = msg;
    if (typeof msg !== "string") {
        msg = JSON.stringify(msg, null, "  ");
    }
    if (msg === "{}") {
        return obj.toString();
    }
    if (msg.startsWith("```json")) {
        return msg;
    }
    return ["```json", msg, "```"].join("\n");
}

const CHATBOT_PROMPT = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are a helpful assistant who remembers all details the user shares with you.`,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
]);


