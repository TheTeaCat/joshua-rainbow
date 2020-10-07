// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_vars.scss'),
      ],
    })
}

module.exports = {
  siteName: 'Joshua Rainbow',
  siteDescription: 'Photography and Programming Projects by Joshua Rainbow O\'Sullivan',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: '*.json',
        baseDir: './content/photography/',
        typeName: 'Photography',
        route: '/photography/:category/:title',
        refs: {
          category: {
            typeName: "Categories",
            route: "/photography/:title",
            create: true,
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: '*.md',
        baseDir: './content/programming/',
        typeName: 'Programming'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'about.json',
        baseDir: './content/root-pages/',
        typeName: 'About'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'frontpage.json',
        baseDir: './content/root-pages/',
        typeName: 'FrontPage'
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-146872812-1'
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
        exclude: [],
        config: {
          '/': {
            changefreq: 'monthly',
            priority: 1
          },
          '/about': {
            changefreq: 'monthly',
            priority: 0.9
          },
          '/photography/*': {
            changefreq: 'monthly',
            priority: 0.8
          },
          '/photography/*/*': {
            changefreq: 'monthly',
            priority: 0.7
          },
          '/programming': {
            changefreq: 'monthly',
            priority: 0.6
          }
        }
      }
    },
    {
      use: 'gridsome-plugin-ogp'
    }
  ],
  transformers: {
    remark: {
      imageQuality: 90,
    }
  },
  siteUrl: 'https://joshuarainbow.co.uk/',
  pathPrefix: '/',
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
	}
}
