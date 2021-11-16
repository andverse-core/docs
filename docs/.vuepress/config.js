module.exports = {
  base: '/',
  title: 'Andverse Docs',
  description: '',
  theme: "book",
  locales: {
    '/': {
      selectText: 'Languages',
      label: 'English',
      ariaLabel: 'Languages',
      lang: 'en-US',
      title: 'Andverse',
      description: 'Andromeda：Metaverse Commerce Ecosystem'
    },
    '/zh/': {
      selectText: '选择语言',
      label: '简体中文',
      lang: 'zh-CN',
      title: '仙女座',
      description: '仙女座：元宇宙商业生态'
    }
  },
  themeConfig: {
    displayAllHeaders: true, // 默认值：false
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        lang: 'en-US',
        title: 'Andverse',
        description: 'Andromeda：Metaverse Commerce Ecosystem'
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        lang: 'zh-CN',
        title: '仙女座',
        description: '仙女座：元宇宙商业生态'
      }
    },
    sidebar: {
      '/zh/': [
        ''
      ],
      '/en/': [
        '',
      ],
      '/': ['']
    },
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'https://github.com/andverse-core/docs',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link
    // if your docs are in a different repo from your main project:
    docsRepo: 'andverse-core/docs',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'dev',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last Updated', // string | boolean
  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // 修改客户端的 webpack 配置
    }
  }
}