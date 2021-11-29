module.exports = {
  base: '/',
  title: 'Andverse Docs',
  description: '',
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
    displayAllHeaders: false, // 默认值：false
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        lang: 'en-US',
        title: 'Andverse',
        description: 'Andromeda：Metaverse Commerce Ecosystem',
        sidebar: [
         {
            title: 'Guide',
            path: '/guide/what-is-andverse',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              '/guide/what-is-andverse'
            ]
          },
          {
            title: 'Community',
            path: '/community/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              // 
            ]
          },
          {
            title: 'Specs',
            path: '/specs/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              '/specs/land',
            ]
          },
          {
            title: 'Technology',
            path: '/technology/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          {
            title: 'RoadMap',
            path: '/roadmap/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          {
            title: 'Developers',
            path: '/developers',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          {
            title: 'Contribution',
            path: '/contribution/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          {
            title: 'F&Q',
            path: '/faq/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          
        ],
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        lang: 'zh-CN',
        title: '仙女座',
        description: '仙女座：元宇宙商业生态',
        sidebar: [
         {
            title: '介绍',
            path: '/zh/guide/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              '/zh/guide/'
            ]
          },
          {
            title: '社区',
            path: '/zh/community/',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              // '/zh/community'
            ]
          },
          {
            title: '规范',
            path: '/zh/specs/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              '/zh/specs/land'
            ]
          },
          {
            title: '技术',
            path: '/zh/technology',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          {
            title: '路线图',
            path: '/zh/roadmap/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          {
            title: '开发者',
            path: '/zh/developers',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          {
            title: 'Contribution',
            path: '/zh/contribution/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          {
            title: '常见问题',
            path: '/zh/faq/',
            collapsable: false,
            sidebarDepth: 0,
            children: [
              // 
            ]
          },
          
        ],
      }
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
    searchPlaceholder: 'Search...',
    // default value is true. Set it to false to hide next page links on all pages
    nextLinks: true,
    // default value is true. Set it to false to hide prev page links on all pages
    prevLinks: true,
    logo: '/assets/img/logo.png',
  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // 修改客户端的 webpack 配置
    }
  }
}