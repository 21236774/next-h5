import { Button } from 'antd-mobile'
export default function Home() {
  return (
    <>
      <nav className="flex p-4 bg-white dark:bg-slate-800">
          <Button color='primary' fill='solid'>
            深色、浅色
          </Button>
      </nav>
    </>
  )
}