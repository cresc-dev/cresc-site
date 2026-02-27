import * as path from 'path';
import { defineConfig } from '@rspress/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import rspressPluginMermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  llms: true,
  outDir: 'out',
  root: path.join(__dirname, 'pages'),
  title: 'Cresc Over-the-Air Updates',
  description: 'Cresc Over-the-Air Updates',
  icon: '/images/logo.svg',
  logo: {
    light: '/images/logo.svg',
    dark: '/images/logo.svg',
  },
  logoText: 'Cresc OTA',
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/reactnativecn/react-native-update' },
    ],
    darkMode: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/intro', activeMatch: '^/docs/' },
      { text: 'Pricing', link: '/pricing' },
      { text: 'FAQ', link: '/docs/faq' },
      { text: 'Login', link: 'https://cresc-admin.reactnative.cn/#/user' },
      { text: 'Register', link: 'https://cresc-admin.reactnative.cn/#/register' },
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
      ],
    },
  },
  plugins: [rspressPluginMermaid()],
});
