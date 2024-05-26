"use client";

import styles from "./home.module.scss";
import {SideBar} from "../../components/sidebar/sidebar";
import {DialogMessage} from "@/app/components/dialog/dialog-message";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    CarOutlined,
    SaveFilled,
    FormatPainterFilled
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, ConfigProvider, Input, Space, Flex} from 'antd';




import {
    HashRouter as Router,
    Routes,
    Route, useLocation,
} from "react-router-dom";
import dynamic from "next/dynamic";
import {Path} from "@/app/constants";

import {useAppConfig} from "../../store/config";
import {RoleDetail} from "@/app/components/role/role-detail";
import {useAccessStore} from "@/app/store/access";
import {Auth} from "@/app/pages/auth/auth";
import {useState} from "react";
import {SearchProps} from "antd/es/input";

const Chat = dynamic(async () => (await import("../chat/chat")).Chat);
const Role = dynamic(async () => (await import("../role/role")).Role);

function Screen() {
    const config = useAppConfig();
    // const location = useLocation();
    const isAuthPath = location.pathname === '/auth'
    const accessStore = useAccessStore();
    const isAuthorised = accessStore.isAuthorized();


    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const {Search} = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e) => console.log(value);
    return (
        <Layout style={{height: '100%'}}>
            <Sider trigger={null} collapsible collapsed={collapsed} width="20%" defaultCollapsed={true}>
                {/*<p style={{color: 'red',fontSize: '30px',overflow: "hidden"}}>ChatWeb</p>*/}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '0',
                            icon: <CarOutlined />,
                            label: 'ChatWeb',
                        },
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Flex align={"center"} justify={"space-between"}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Flex align={"center"} justify={"center"} gap={"middle"} >
                            <Search
                            placeholder="input search text"
                            allowClear
                            size="small"
                            onSearch={onSearch}
                            style={{width:'200px'}}
                        />
                            <SaveFilled/>
                            <FormatPainterFilled />
                        </Flex>
                    </Flex>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Routes>
                        <Route path={Path.Home} element={<Chat/>}/>
                      <Route path={Path.Chat} element={<Chat/>}>
                           <Route path=":id" element={<DialogMessage/>}/>
                       </Route>
                         <Route path={Path.Role} element={<Role/>}>
                             <Route path=":id" element={<RoleDetail/>}/>
                        </Route>
                     </Routes>
                </Content>
            </Layout>
        </Layout>
        // <div className={`${config.tightBorder ? styles["tight-container"] : styles.container}`}>
        //
        //     {/*{isAuthPath || !isAuthorised ? (<Auth/>):(*/}
        //     {/*    <>*/}
        //     {/*        <SideBar/>*/}
        //     {/*        <div className={styles["window-content"]}>*/}
        //     {/*            <Routes>*/}
        //     {/*                <Route path={Path.Home} element={<Chat/>}/>*/}
        //     {/*                <Route path={Path.Chat} element={<Chat/>}>*/}
        //     {/*                    <Route path=":id" element={<DialogMessage/>}/>*/}
        //     {/*                </Route>*/}
        //     {/*                <Route path={Path.Role} element={<Role/>}>*/}
        //     {/*                    <Route path=":id" element={<RoleDetail/>}/>*/}
        //     {/*                </Route>*/}
        //     {/*            </Routes>*/}
        //     {/*        </div>*/}
        //     {/*    </>*/}
        //     {/*)}*/}
        //     <SideBar/>
        //     <div className={styles["window-content"]}>
        //         <Routes>
        //             <Route path={Path.Home} element={<Chat/>}/>
        //             <Route path={Path.Chat} element={<Chat/>}>
        //                 <Route path=":id" element={<DialogMessage/>}/>
        //             </Route>
        //             <Route path={Path.Role} element={<Role/>}>
        //                 <Route path=":id" element={<RoleDetail/>}/>
        //             </Route>
        //         </Routes>
        //     </div>
        //
        // </div>
    );
}

export function Home() {
    return (
        <ConfigProvider theme={{
            token: {
                colorBgContainer: '#fff',
                borderRadiusLG: 16,
            },
        }}>
            <Router>
                <Screen/>
            </Router>
        </ConfigProvider>
        // <Router>
        //     <Screen/>
        // </Router>

    );
}