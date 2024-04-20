'use client'
import Image from "next/image";
import wangxiaomei from "@/assets/icon/wangxiaomei.png"
import { Tabs, Swiper  } from "antd-mobile";
import React, { useRef, useState } from 'react'
import { SwiperRef } from 'antd-mobile/es/components/swiper'

const tabItems = [
  { key: 'fruits', title: '水果' },
  { key: 'vegetables', title: '蔬菜' },
  { key: 'animals', title: '动物' },
]

export default function Home() {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className="flex flex-col h-full">
      <header className="flex p-4 bg-white dark:bg-dark-18">
        <div className="h-10 mx-4 flex w-full">
          <div className="flex-1 border rounded-lg bg-slate-100 dark:bg-gray-700 dark:border-slate-300 h-full pl-4 leading-10 box-border flex items-center dark:text-white">
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
      <nav className="mt-2 flex-1 flex flex-col">
        <Tabs
         activeLineMode="fixed"
         className="bg-white dark:bg-dark-18"
         style={{
           '--fixed-active-line-width': '25px',
           '--title-font-size': '15px',
           '--content-padding': '0px'
         }}
         activeKey={tabItems[activeIndex].key}
         onChange={key => {
           const index = tabItems.findIndex(item => item.key === key)
           setActiveIndex(index)
           swiperRef.current?.swipeTo(index)
         }}
        >
            {tabItems.map(item => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
        <Swiper
          className="flex-1 mb-14"
          direction='horizontal'
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={activeIndex}
          onIndexChange={index => {
            setActiveIndex(index)
          }}
        >
          <Swiper.Item>
            <div className="h-full p-4 bg-white dark:bg-dark-18">菠萝</div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="h-full p-4 bg-white dark:bg-dark-18">西红柿</div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="h-full p-4 bg-white dark:bg-dark-18">蚂蚁</div>
          </Swiper.Item>
        </Swiper>
      </nav>
    </div>
  );
}
