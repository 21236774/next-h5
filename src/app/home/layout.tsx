'use client'
import React, { useState, useRef } from "react";
import { Badge, TabBar, Swiper } from "antd-mobile";
import { useRouter, usePathname } from "next/navigation"

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
  const router = useRouter()
  const tabs = [
    {
      key: "home",
      title: "首页",
      path: '/home',
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
      path: '/home/user',
      icon: <UserOutline />,
    },
  ]

  const path = usePathname()
  const active = tabs.findIndex(el => el.path === path)
  const [activeKey, setActiveKey] = useState(active !== -1 ? active : 1)
  const tabBarChange = (key: string) => {
    const index = tabs.findIndex(item => item.key === key)
    if (tabs[index]?.path) {
      router.push(tabs[index]?.path as string)
    }
    setActiveKey(index)
  }
  
  return (
    <>
      <main className="h-full">{children}</main>
      <TabBar className="absolute bottom-0 w-full bg-white dark:bg-dark-18" activeKey={tabs[activeKey].key} onChange={tabBarChange}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </>
  );
}
