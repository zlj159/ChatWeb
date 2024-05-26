import {MessageRole} from "@/types/chat";
import {GptVersion} from "@/app/constants";
import {useAccessStore} from "@/app/store/access";
import {OpenAI, ChatOpenAI} from "@langchain/openai";
import {ChatMessage} from "@ant-design/pro-chat";
import {HumanMessage, SystemMessage} from "@langchain/core/messages";

const host = "http://localhost:8091";

export const getRoleList = () => {
    // 从 apiPost mock 接口获取
    // return fetch(`${host}/role/list`).then((res) =>
    //     res.json()
    // );

    // 从本地 json 文件获取
    return fetch(`/prompts.json`).then((res) =>
        res.json()
    );
}

export const completions = (data: {
    messages: { content: string; role: MessageRole }[],
    model: GptVersion
}) => {
    return fetch('api/chat', {
        method: 'post',
        mode: 'cors',
        headers: {
            // b8b6 后续用于写入 token 加密信息
            Authorization: "b8b6",
            'Content-Type': 'application/json;charset=utf-8',
            "Access-Control-Allow-Origin" : "*",
        },
        body: JSON.stringify(data)
    })
}


/**
 * 登录鉴权接口
 * @param token
 */
export const login = (token: string) => {
    const accessState:any = useAccessStore.getState()
    return fetch(`${host}/api/v1/auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `code=${accessState.accessCode}`
    });
};


