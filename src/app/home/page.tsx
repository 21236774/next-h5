'use client'
import Image from "next/image";
import wangxiaomei from "@/assets/icon/wangxiaomei.png"
import { Tabs } from "antd-mobile";

export default function Home() {
  return (
    <>
      <header className="flex p-4 bg-white dark:bg-dark-18">
        <div className="h-10 mx-4 flex w-full">
          <div className="flex-1 border rounded-lg bg-slate-100 dark:bg-gray-800 dark:border-slate-300 h-full pl-4 leading-10 box-border flex items-center dark:text-white">
            <span>搜索</span>
          </div>
          <Image
            src={wangxiaomei}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full ml-4"
          />
        </div>
      </header>
      <nav className="mt-20">
        <Tabs
         activeLineMode="fixed"
         style={{
           '--fixed-active-line-width': '25px',
           '--title-font-size': '15px',
           '--content-padding': '0px'
         }}
        >
          <Tabs.Tab title='水果' key='fruits'>
            菠萝
          </Tabs.Tab>
          <Tabs.Tab title='蔬菜' key='vegetables'>
            西红柿
          </Tabs.Tab>
          <Tabs.Tab title='动物' key='animals'>
            蚂蚁
          </Tabs.Tab>
        </Tabs>
      </nav>
    </>
  );
}
