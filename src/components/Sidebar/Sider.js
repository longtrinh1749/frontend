import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { BookOutlined, BarChartOutlined, UserOutlined, FileExclamationOutlined, FolderOutlined, LaptopOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useState } from 'react';
import './Sider.css'
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    { label: 'item 1', key: 'item-1' }, // remember to pass the key prop
    { label: 'item 2', key: 'item-2' }, // which is required
    {
        label: 'sub menu',
        key: 'submenu',
        children: [{ label: 'item 3', key: 'submenu-item-1' }],
    },
];

const Leftbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        // <Layout
        //     style={{
        //         minHeight: '100vh',
        //     }}
        // >
        //     <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        //         <div className="logo" />
        //         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        //     </Sider>
        //     <Layout className="site-layout">
        //         <Header
        //             className="site-layout-background"
        //             style={{
        //                 padding: 0,
        //             }}
        //         />
        //         <Footer
        //             style={{
        //                 textAlign: 'center',
        //             }}
        //         >
        //             Ant Design ©2018 Created by Ant UED
        //         </Footer>
        //     </Layout>
        // </Layout>

        <Router>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item>
                        <Link to='/courses'>
                        </Link>
                        <FolderOutlined />
                        <span>
                            <a className='sidebar-redirect' href='/courses' style={{color: 'white'}}>Courses</a>
                        </span>
                    </Menu.Item>
                    <Menu.Item >
                        {/* <Link to='/assignments'>
                            
                        </Link> */}
                        <FileExclamationOutlined />
                        <span>
                            <a className='sidebar-redirect' href='/assignments' style={{color: 'white'}}>Assignments</a>
                        </span>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/bookmark'>
                        </Link>
                        <BookOutlined />
                        <span>
                            <a className='sidebar-redirect' href='/bookmark' style={{color: 'white'}}>Bookmark</a>
                        </span>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/statistic'>
                        </Link>
                        <BarChartOutlined />
                        <span>
                            <a className='sidebar-redirect' href='/statistic' style={{color: 'white'}}>Statistic</a>
                        </span>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/account'>
                        </Link>
                        <UserOutlined />
                        <span>
                            <a className='sidebar-redirect' href='/account' style={{color: 'white'}}>Account</a>
                        </span>
                    </Menu.Item>
                </Menu>
            </Sider>
        </Router >
    );
};

export default Leftbar;