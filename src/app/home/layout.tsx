'use client'
import React, { useState } from "react";
import { Badge, TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      key: "home",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: "todo",
      title: "待办",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "message",
      title: "消息",
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: "99+",
    },
    {
      key: "personalCenter",
      title: "我的",
      icon: <UserOutline />,
    },
  ]
  const [activeKey, setActiveKey] = useState("home");
  const tabBarChange = (key: string) => {
    setActiveKey(key)
  }
  
  return (
    <>
      <main>{children}</main>
      <TabBar className="absolute bottom-0 w-full bg-slate-100 dark:bg-dark-18" activeKey={activeKey} onChange={tabBarChange}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </>
  );
}
