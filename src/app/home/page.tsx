"use client";
import Image from "next/image";
import wangxiaomei from "@/assets/icon/wangxiaomei.png";
import { Tabs, Swiper, Divider, Skeleton } from "antd-mobile"
import React, { useRef, useState, useEffect } from "react"
import { SwiperRef } from "antd-mobile/es/components/swiper"
import { getCategoryData, getArticleData } from '@/app/api'
import { useRequest } from "ahooks"
import style from './style.module.scss'
import { useRouter } from "next/navigation"
import commentIcon from "@/assets/icon/comment-icon.png"
import likeIcon from "@/assets/icon/like-icon.png"

const SwiperItemBox = ({ item, toDtetail }: { item: Articles.Item, toDtetail: (id: number | string) => void }) => {
  return (
    <div className="article-box border-b border-inherit dark:border-zinc-800 py-4" onClick={() => {toDtetail(item.id)}}>
      <div className="title-row truncate">
        <a
          title={item.title}
          className="text-black dark:text-title text-base font-semibold truncate"
        >
          {item.title}
        </a>
      </div>
      <div className="abstract mt-1 line-clamp-2">
        <a
          title={item.abstract}
          className="line-clamp-2 text-inherit dark:text-tag-text"
        >
          {item.abstract}
        </a>
      </div>
      <div className="entry-footer flex justify-between mt-2">
        <div className="flex items-center">
          <div className="user-name text-inherit dark:text-tag-text">{item.user}</div>
          <Divider direction="vertical" />
          <div className="user-name text-inherit dark:text-tag-text">
            <Image
              src={likeIcon}
              alt="logo"
              width={15}
              height={15}
              className="rounded-full"
            />
          </div>
          <Divider direction="vertical" />
          <div className="user-name text-inherit dark:text-tag-text">
            <Image
              src={commentIcon}
              alt="logo"
              width={15}
              height={15}
              className="rounded-full"
            />
          </div>
        </div>
        <ul className="entry-tag flex">
          {item.tagArr.map((el: string) => <li key={el} className="ml-2 max-w-16 truncate dark:text-tag-text rounded px-1.5 bg-slate-100 dark:bg-tag-bg">
            {el}
          </li>)}
        </ul>
      </div>
    </div>
  )
}

const SkeletonItem = () => {
  return (
    <>
      {[0, 1, 2, 3, 5].map((el) => <div className="border-b border-inherit mb-4" key={el}>
        <Skeleton animated className={style.swiperBox} />
        <Skeleton animated className={style.abstractBox} />
        <Skeleton.Paragraph lineCount={1} animated />
      </div>)}
    </>
  )
}

export default function Home() {
  const router = useRouter()
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const { data: categoryList, loading } = useRequest(getCategoryData)
  const { runAsync, loading: articleLogin } = useRequest(getArticleData, {
    manual: true
  })
  const getArticle = (id: number) => {
    runAsync(id).then(({ code, data }: ApiData<Articles.Category<Articles.Post>>) => {
      if (code === 200) {
        const posts = data.posts
        if (posts) {
          const articlesItem: Articles.Item[] = posts.map((el) => {
            return { ...el.articles, categoryId: el.categoryId }
          })
          articlesItem.forEach(el => {
            el.tagArr = []
            categoryList.data.forEach((item: Articles.Category<Articles.Item>) => {
              const tagArr = el.tags.split(',')
              const obj = tagArr.find((el) => item.id === el as unknown as number * 1)
              if (obj) el.tagArr?.push(item.tagName)
              if (!item?.posts?.length) {
                item.posts = []
              }
              if (el.categoryId === item.id) item.posts?.push(el)
            })
          })
        }
      }
    })
  }
  const tabChange = (key: string | number) => {
    const val = Number(key)
    const obj = categoryList.data.find((el: Articles.Category<string>) => el.id === val)
    if(!obj?.posts?.length) getArticle(val)
    setActiveIndex(val)
  }
  const toDtetail = (id: string | number) => {
    router.push(`/detail/${id}`)
  }
  useEffect(() => {
    if (!loading) {
      const item = categoryList?.data.find((obj: any) => obj.disabled !== 0)
      if (item) {
        setActiveIndex(item.id)
        getArticle(item.id)
      }
    }
  }, [loading])
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
          onChange={(key) => swiperRef.current?.swipeTo(key as unknown as number)}
        >
          {categoryList?.data.map((item: any) => (
            item?.disabled ? <Tabs.Tab title={item.tagName} key={item.id} /> : null
          ))}
        </Tabs>
        {
          articleLogin ? <div className={style.SkeletonItem}>
            <SkeletonItem />
          </div> :
            <Swiper
              className={`${style.SkeletonItem} flex-1`}
              direction="horizontal"
              loop
              indicator={() => null}
              ref={swiperRef}
              defaultIndex={activeIndex}
              onIndexChange={(index) => {
                tabChange(index)
              }}
            >
              {
                categoryList?.data.map((item: any) => <Swiper.Item key={item.id}>
                  <div className={`px-4 bg-white dark:bg-dark-18 ${style.SkeletonItem}`}>
                    {item?.posts ? item?.posts.map((el: Articles.Item) => <SwiperItemBox key={el.id} item={el} toDtetail={toDtetail} />) : null}
                  </div>
                </Swiper.Item>)
              }
            </Swiper>
        }
      </nav>
    </div >
  );
}
