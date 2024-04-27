"use client";
import Image from "next/image";
import wangxiaomei from "@/assets/icon/wangxiaomei.png";
import { Tabs, Swiper, Divider } from "antd-mobile";
import React, { useRef, useState, useEffect } from "react";
import { SwiperRef } from "antd-mobile/es/components/swiper"
import { getCategoryData, getArticleData } from '@/app/api'
import { useRequest } from "ahooks"

// 下次研究一下接口自动生成TS类型的工具
export default function Home() {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const { data: categoryList } = useRequest(getCategoryData)
  const { runAsync } = useRequest(getArticleData)
  useEffect(() => {
    if (categoryList?.data.length) {
      const item = categoryList?.data.find((obj: any) => obj.disabled !== 0)
      if(item) {
        setActiveIndex(item.id)
        runAsync(item.id)
      }
    }
  }, [categoryList])
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
            "--fixed-active-line-width": "25px",
            "--title-font-size": "15px",
            "--content-padding": "0px",
          }}
          activeKey={categoryList?.data[activeIndex].id}
          onChange={(key) => {
            setActiveIndex(Number(key));
            swiperRef.current?.swipeTo(key as unknown as number);
          }}
        >
          {categoryList?.data.map((item: any) => (
            item?.disabled ? <Tabs.Tab title={item.tagName} key={item.id} /> : null
          ))}
        </Tabs>
        <Swiper
          className="flex-1"
          direction="horizontal"
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={activeIndex}
          onIndexChange={(index) => {
            setActiveIndex(index);
          }}
        >
          <Swiper.Item>
            <div className="h-full px-4 bg-white dark:bg-dark-18">
              <div className="article-box border-b border-inherit py-4">
                <div className="title-row truncate">
                  <a
                    href=""
                    title="这是标题"
                    className="text-black dark:text-title text-base font-semibold truncate"
                  >
                    这是标题这是标题这是标题这是标题这是标题这是标题
                  </a>
                </div>
                <div className="abstract truncate mt-1">
                  <a
                    href=""
                    title="这是摘要摘要摘要摘要摘要摘要"
                    className="truncate text-inherit dark:text-tag-text"
                  >
                    这是摘要摘要摘要摘要摘要摘要这是摘要摘要摘要摘要摘要摘要这是摘要摘要摘要摘要摘要摘要
                  </a>
                </div>
                <div className="entry-footer flex justify-between mt-2">
                  <div className="flex items-center">
                    <div className="user-name text-inherit dark:text-tag-text">admin</div>
                    <Divider direction="vertical" />
                    <div className="user-name text-inherit dark:text-tag-text">admin</div>
                    <Divider direction="vertical" />
                    <div className="user-name text-inherit dark:text-tag-text">admin</div>
                  </div>
                  <ul className="entry-tag flex">
                    <li className="max-w-16 truncate dark:text-tag-text rounded px-1.5 bg-slate-100 dark:bg-tag-bg">
                      前端
                    </li>
                    <li className="ml-2 max-w-16 truncate dark:text-tag-text rounded px-1.5 bg-slate-100 dark:bg-tag-bg">
                      后端
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="h-full px-4 pt-4 bg-white dark:bg-dark-18">
              西红柿
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="h-full px-4 pt-4 bg-white dark:bg-dark-18">
              蚂蚁
            </div>
          </Swiper.Item>
        </Swiper>
      </nav>
    </div>
  );
}
