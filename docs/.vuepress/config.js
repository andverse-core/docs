module.exports = {
  title: 'Andverse',
  description: '',
  theme: "book",
  themeConfig: {
    displayAllHeaders: true, // 默认值：false
    nav: [
          { text: 'English Version', link: '/en/', ariaLabel: 'English Version' },
          { text: '中文版', link: '/zh/', ariaLabel: '中文版' },
        ],
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