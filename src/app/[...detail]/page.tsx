'use client'
import { useParams } from "next/navigation"
import { useRequest } from "ahooks"
import { getArticleDetail } from '@/app/api'
import { markdownParser } from '@/utils'
import Image from "next/image";
import { Button } from 'antd-mobile'
import wangxiaomei from "@/assets/icon/wangxiaomei.png"
import moment from 'moment'

export default function Detail() {
  const params = useParams()
  let id = params?.detail?.[1] as string || 1
  const { data, error, loading } = useRequest(async () => await getArticleDetail(id))
  const root = document.documentElement;
  const classNames = root.classList;
  let darkFlag = false
  if(classNames.length) {
    classNames.forEach(item => {
      if(item === 'dark') {
        darkFlag = true
      }
    })
  }
  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>error...</div>
  }
  return (
    <div className="bg-slate-100 dark:bg-black">
      <header className="bg-white dark:bg-dark-18 mb-4 py-2">
        <h2 className="text-2xl pl-5 mb-4">{data.data[0]?.title}</h2>
        <div className="flex items-center justify-between px-5">
          <div className="flex">
            <Image
              src={wangxiaomei}
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-4">
              <div className="text-sm">{data.data[0].user}</div>
              <div className="text-xs">
                {moment(data.data[0].date).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
          </div>
          <Button size='mini' color='primary'>
            关注
          </Button>
        </div>
      </header>
      <div className={`markdown-body bg-white dark:bg-dark-18 p-5 ${darkFlag ? '__dark' : ''}`}>
        { data && <div dangerouslySetInnerHTML={{ __html: markdownParser.render(data.data[0].text) }} /> }
      </div>
    </div>

  )
}