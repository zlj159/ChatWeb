import {NextApiRequest, NextApiResponse} from "next";
import makeChatChain from "@/utils/makeChain";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const {question, history} = req.body
    if (!question) {
        return res.status(400).json({ error: 'Missing question' })
    }
    try {
        // replace all new lines with spaces
        const sanitizedQuestion = question.trim.replaceAll('\n', '')
        const pastMessages = history
            .map((message: [string, string]) => {
                return [`Human: ${message[0]}`, `Assistant: ${message[1]}`].join('\n');
            })
            .join('\n');
        // call the AI service
        const chain = makeChatChain()

        const response = await chain.invoke({input: sanitizedQuestion, chat_history: pastMessages})
        res.status(200).json({ text: response });
    }catch (error: any) {
        console.log('error', error);
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
}