import * as path from 'path';
import * as fs from 'fs';
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
            { text: 'AI Skills', link: '/docs/skills' },
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
            { text: 'CLI Tools', link: '/docs/cli' },
            { text: 'Brownfield Integration', link: '/docs/brownfield' },
            { text: 'Best Practices', link: '/docs/bestpractice' },
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
          tag: 'link',
          attrs: {
            rel: 'manifest',
            href: '/manifest.webmanifest',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#D7B57C',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'apple-mobile-web-app-title',
            content: 'Cresc',
          },
        },
        {
          tag: 'script',
          attrs: {
            src: '/register-pwa.js',
            defer: true,
          },
        },
        {
          tag: 'script',
          attrs: {
            src: '/webmcp-loader.js',
            defer: true,
          },
        },
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
    server: {
      headers: {
        'Link': '</.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc"'
      },
      setup: ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const urlStr = req.url || '';
          const urlPath = urlStr.split('?')[0];
          
          if (urlPath === '/.well-known/api-catalog') {
            res.setHeader('Content-Type', 'application/linkset+json; charset=utf-8');
          } else if (urlPath === '/.well-known/openid-configuration' ||
                     urlPath === '/.well-known/oauth-authorization-server' ||
                     urlPath === '/.well-known/oauth-protected-resource' ||
                     urlPath === '/.well-known/mcp/server-card.json' ||
                     urlPath === '/.well-known/agent-skills/index.json') {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
          } else if (urlPath === '/auth.md' || urlPath.endsWith('/SKILL.md')) {
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          }

          if (req.headers.accept && req.headers.accept.includes('text/markdown')) {
            // Find corresponding .md or .mdx file
            let pathname = urlPath;
            if (pathname !== '/' && pathname.endsWith('/')) {
              pathname = pathname.slice(0, -1);
            }
            const candidates: string[] = [];
            if (pathname === '/') {
              candidates.push(path.join(__dirname, 'pages', 'index.mdx'));
              candidates.push(path.join(__dirname, 'pages', 'index.md'));
            } else {
              if (pathname.endsWith('.html')) {
                pathname = pathname.slice(0, -5);
              }
              candidates.push(path.join(__dirname, 'pages', `${pathname}.mdx`));
              candidates.push(path.join(__dirname, 'pages', `${pathname}.md`));
              candidates.push(path.join(__dirname, 'pages', pathname, 'index.mdx'));
              candidates.push(path.join(__dirname, 'pages', pathname, 'index.md'));
            }

            for (const file of candidates) {
              if (fs.existsSync(file)) {
                try {
                  const content = fs.readFileSync(file, 'utf-8');
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
                  const tokenCount = Math.ceil(content.length / 4);
                  res.setHeader('x-markdown-tokens', String(tokenCount));
                  res.end(content);
                  return;
                } catch (e) {
                  // ignore and fallback
                }
              }
            }
          }
          next();
        });
      }
    }
  },
  plugins: [rspressPluginMermaid()],
});
