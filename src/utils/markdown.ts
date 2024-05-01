// src/utils/markdown.ts

import MarkdownIt from 'markdown-it'
import MarkdownItHighlightjs from 'markdown-it-highlightjs'
import hljs from 'highlight.js'

const markdownParser = new MarkdownIt({
  html: true, // 允许HTML标签
  linkify: true, // 自动识别URLs并转化为链接
  typographer: true // 启用智能排版功能
})
// 添加代码高亮插件
markdownParser.use(MarkdownItHighlightjs, { hljs })

export { markdownParser }
