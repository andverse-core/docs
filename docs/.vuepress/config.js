module.exports = {
  base: '/',
  title: 'Andverse Docs',
  description: '',
  theme: "book",
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Andverse',
      description: 'Andromeda：Metaverse Commerce Ecosystem'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: '仙女座',
      description: '仙女座：元宇宙商业生态'
    }
  },
  themeConfig: {
    displayAllHeaders: true, // 默认值：false
    sidebar: {
      '/zh/': [
        ''
      ],
      '/en/': [
        '',
      ],
      '/': ['']
    },
  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // 修改客户端的 webpack 配置
    }
  }
}