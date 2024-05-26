import styles from './chat.module.scss';
import {DialogList} from "@/app/components/dialog/dialog-list";
import {Outlet} from 'react-router-dom';
import {ProChat,ChatMessage} from "@ant-design/pro-chat";

export function Chat() {
    return (
        // <div className={styles["chat"]}>
        //     <DialogList/>
        //     <Outlet/>
        // </div>
        <ProChat request={async (messages,modelConfig) => {
            console.log(JSON.stringify(messages))
            return new Response(JSON.stringify("hello"))
        }}
        />

    );
}