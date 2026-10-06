import { Layout as BasicLayout } from '@rspress/core/theme-original';
import { useHead, useFrontmatter, usePage, useSite } from '@rspress/core/runtime';
import '../styles/index.scss';
import '../components/home/home.scss';

const SITE_URL = 'https://cresc.dev';
const OG_IMAGE = `${SITE_URL}/images/og-cover.png`;

type HeadEntry = [string, Record<string, string>];

// Fills in the per-page SEO tags Rspress leaves out: canonical URLs, social
// cards, a real <title> on custom pages, and TechArticle data for docs.
// Anything a page already declares in its frontmatter `head` wins.
function SeoHead() {
  const { page } = usePage();
  const { site } = useSite();
  const { frontmatter } = useFrontmatter();

  const declared = new Set<string>();
  for (const [tag, attrs] of (frontmatter.head ?? []) as HeadEntry[]) {
    if (tag === 'link' && attrs?.rel) declared.add(`link:${attrs.rel}`);
    if (tag === 'meta') declared.add(attrs?.property ?? attrs?.name);
  }

  const { pageType, routePath } = page;
  const url = `${SITE_URL}${routePath}`;
  const description = page.description || site.description;

  // Rspress only applies frontmatter titles to doc pages; custom pages
  // (home, pricing) would otherwise all be titled just "Cresc".
  const customTitle =
    pageType === 'custom' && typeof frontmatter.title === 'string' ? frontmatter.title : undefined;
  const title =
    customTitle ?? (page.title ? `${page.title} - ${site.title}` : site.title);
  const ogTitle =
    (frontmatter.head as HeadEntry[] | undefined)?.find(([, a]) => a?.property === 'og:title')?.[1]
      .content ?? title;

  const isDoc = routePath.startsWith('/docs/');
  const meta: Array<Record<string, string>> = [];
  const addMeta = (key: 'name' | 'property', id: string, content: string) => {
    if (!declared.has(id)) meta.push({ [key]: id, content });
  };
  addMeta('property', 'og:url', url);
  if (isDoc) addMeta('property', 'og:type', 'article');
  addMeta('property', 'og:image', OG_IMAGE);
  addMeta('property', 'og:image:width', '1200');
  addMeta('property', 'og:image:height', '630');
  addMeta('property', 'og:image:alt', 'Cresc — React Native OTA updates');
  addMeta('name', 'twitter:image', OG_IMAGE);
  addMeta('name', 'twitter:title', ogTitle);
  if (description) addMeta('name', 'twitter:description', description);

  const script = isDoc
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              headline: page.title,
              description,
              url,
              inLanguage: 'en',
              image: OG_IMAGE,
              ...(page.lastUpdatedTime ? { dateModified: page.lastUpdatedTime } : {}),
              publisher: { '@type': 'Organization', name: 'Cresc', url: `${SITE_URL}/` },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Cresc', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Documentation', item: `${SITE_URL}/docs/intro` },
                { '@type': 'ListItem', position: 3, name: page.title, item: url },
              ],
            },
          ]),
        },
      ]
    : [];

  useHead(
    pageType === '404'
      ? { meta: [{ name: 'robots', content: 'noindex' }] }
      : {
          ...(customTitle ? { title } : {}),
          link: declared.has('link:canonical') ? [] : [{ rel: 'canonical', href: url }],
          meta,
          script,
        },
  );

  return null;
}

export const Layout = () => (
  <>
    <BasicLayout />
    <SeoHead />
  </>
);
export * from '@rspress/core/theme-original';
