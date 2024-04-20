'use client'
import { Button } from 'antd-mobile'
export default function Home() {
  type Color = '深色' | '浅色'
  const tag = 'data-prefers-color-scheme'
  const theme = 'dark'
  const onColor = (color: Color) => {
    const root = document.documentElement
    if (color === '深色') {
      root.classList.add(theme)
      root.setAttribute(tag, theme)
    } else {
      root.classList.remove(theme)
      root.removeAttribute(tag)
    }
  }
  return (
    <>
      <nav className="flex p-4 bg-white dark:bg-slate-800">
          <Button color='primary' fill='solid' onClick={()=>{ onColor('深色') }}>
            深色
          </Button>
          <Button color='primary' fill='solid' onClick={()=>{ onColor('浅色') }}>
            浅色
          </Button>
      </nav>
    </>
  )
}