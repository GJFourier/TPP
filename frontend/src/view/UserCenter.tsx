import {Layout, Menu, MenuProps} from "antd";
import Sider from "antd/es/layout/Sider";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Outlet, useLocation} from "react-router";
import {Cookies} from "react-cookie";


type MenuItem = Required<MenuProps>['items'][number];
export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
export function UserCenter(){
    const cookies=new Cookies();
    const user=cookies.get('currentUser');
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const menuItems=[
        getItem(<Link to={'/ticketBooking/user/'+user.id+'/profile/'}>个人信息</Link>,'0'),
        getItem(<Link to={'/ticketBooking/user/'+user.id+'/orders/'}>订单列表</Link>,'1')
    ];
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    useEffect(() => {
        const newDefaultSelectedKeys: string[] = [];
        const pathname = location.pathname;
        const url = ["profile", "order"];
        url.forEach((urlKeyWord: string, index: number) => {
            if (pathname.includes(urlKeyWord))
                newDefaultSelectedKeys.push((index).toString());
        });
        setSelectedKeys(newDefaultSelectedKeys);
    }, [location, location.pathname]);
    return (
        <div className="user-center">
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={menuCollapsed} onCollapse={(value) => setMenuCollapsed(value)}>
                    <Menu theme="dark" mode="inline" items={menuItems} selectedKeys={selectedKeys} />
                </Sider>
                <Outlet/>
            </Layout>
        </div>
    )
}
