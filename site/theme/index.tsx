import { Layout as BasicLayout } from '@rspress/core/theme-original';
import { useHead, useFrontmatter, usePage, useSite } from '@rspress/core/runtime';
import '../styles/index.scss';
import '../components/home/home.scss';

const SITE_URL = 'https://cresc.dev';
const OG_IMAGE = `${SITE_URL}/images/og-cover.png`;

// scripts/build-og-images.mjs renders /og/<route>.png for every page except
// home, which keeps the hand-made cover.
const ogImageFor = (routePath: string) =>
  routePath === '/' ? OG_IMAGE : `${SITE_URL}/og${routePath}.png`;

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
  // (home, pricing) would otherwise all be titled just "Cresc". `seoTitle`
  // lets a page with a short sidebar label carry a fuller <title>, and a
  // title that already names the brand skips the " - Cresc" suffix.
  const customTitle =
    typeof frontmatter.seoTitle === 'string'
      ? frontmatter.seoTitle
      : pageType === 'custom' && typeof frontmatter.title === 'string'
        ? frontmatter.title
        : page.title?.includes(site.title)
          ? page.title
          : undefined;
  const title =
    customTitle ?? (page.title ? `${page.title} - ${site.title}` : site.title);
  const ogTitle =
    (frontmatter.head as HeadEntry[] | undefined)?.find(([, a]) => a?.property === 'og:title')?.[1]
      .content ?? title;

  const isDoc = routePath.startsWith('/docs/');
  const image = ogImageFor(routePath);
  const meta: Array<Record<string, string>> = [];
  const addMeta = (key: 'name' | 'property', id: string, content: string) => {
    if (!declared.has(id)) meta.push({ [key]: id, content });
  };
  addMeta('property', 'og:url', url);
  if (isDoc) addMeta('property', 'og:type', 'article');
  addMeta('property', 'og:image', image);
  addMeta('property', 'og:image:width', '1200');
  addMeta('property', 'og:image:height', '630');
  addMeta('property', 'og:image:alt', routePath === '/' ? 'Cresc — React Native OTA updates' : ogTitle);
  addMeta('name', 'twitter:image', image);
  addMeta('name', 'twitter:title', ogTitle);
  if (description) addMeta('name', 'twitter:description', description);

  // Landing pages (comparisons, guides) sit one level below home.
  const breadcrumb = (trail: Array<[string, string]>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  });
  const isLanding = !isDoc && routePath !== '/' && pageType !== '404';

  const script = isLanding
    ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumb([['Cresc', `${SITE_URL}/`], [page.title, url]])) }]
    : isDoc
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
              image,
              ...(page.lastModified ? { dateModified: page.lastModified } : {}),
              publisher: { '@type': 'Organization', name: 'Cresc', url: `${SITE_URL}/` },
            },
            breadcrumb([
              ['Cresc', `${SITE_URL}/`],
              ['Documentation', `${SITE_URL}/docs/intro`],
              [page.title, url],
            ]),
          ]),
        },
      ]
    : [];

  useHead(
    pageType === '404'
      ? { meta: [{ name: 'robots', content: 'noindex' }] }
      : {
          ...(customTitle ? { title } : {}),
          link: [
            ...(declared.has('link:canonical') ? [] : [{ rel: 'canonical', href: url }]),
            // The Markdown export rspress writes next to every page; agents
            // that follow alternates get clean text instead of the app shell.
            { rel: 'alternate', type: 'text/markdown', href: `${SITE_URL}${routePath === '/' ? '/index' : routePath}.md` },
          ],
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
