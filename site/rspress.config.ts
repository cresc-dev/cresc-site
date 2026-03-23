import * as path from 'path';
import { defineConfig } from '@rspress/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import rspressPluginMermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  llms: true,
  outDir: 'out',
  root: path.join(__dirname, 'pages'),
  title: 'Cresc',
  description: 'React Native OTA updates with delta patches, rollback safety, CI/CD publishing, and migration paths for CodePush or App Center teams.',
  icon: '/images/logo.svg',
  logo: {
    light: '/images/logo.svg',
    dark: '/images/logo.svg',
  },
  logoText: 'Cresc',
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/reactnativecn/react-native-update' },
    ],
    darkMode: false,
    llmsUI: {
      viewOptions: ['markdownLink', 'chatgpt', 'claude'],
      placement: 'outline',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'CodePush Alternative', link: '/codepush-alternative' },
      { text: 'Documentation', link: '/docs/intro', activeMatch: '^/docs/' },
      { text: 'Pricing', link: '/pricing' },
      { text: 'FAQ', link: '/docs/faq' },
      { text: 'Login', link: 'https://admin.cresc.dev' },
      { text: 'Register', link: 'https://admin.cresc.dev/#/register' },
    ],
    sidebar: {
      '/docs/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/docs/intro' },
            { text: 'Installation', link: '/docs/getting-started' },
            { text: 'Integration', link: '/docs/integration' },
            { text: 'Publishing', link: '/docs/publish' },
          ],
        },
        {
          text: 'Advanced Usage',
          items: [
            { text: 'API Reference', link: '/docs/api' },
            { text: 'API Token', link: '/docs/api-token' },
            { text: 'CLI Tools (Built-in)', link: '/docs/cli' },
            { text: 'CLI Tools (Custom)', link: '/docs/cli_module' },
            { text: 'Best Practices', link: '/docs/bestpractice' },
            { text: 'Skills Installation', link: '/docs/skills' },
          ],
        },
        {
          text: 'Others',
          items: [
            { text: 'FAQ', link: '/docs/faq' },
          ],
        }
      ],
    },
  },
  builderConfig: {
    plugins: [pluginSass()],
    html: {
      tags: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:keywords',
            content: 'OTA,hotupdate,no-review,fast-publish',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content: 'react native ota update,codepush alternative,app center alternative,expo updates alternative,react native hot update,harmony ota',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'robots',
            content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:site_name',
            content: 'Cresc',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
        },
      ],
    },
  },
  plugins: [rspressPluginMermaid()],
});
