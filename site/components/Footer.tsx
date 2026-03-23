function Footer() {
  const columns = [
    {
      title: "Contact Us",
      links: [
        { text: "Email hi@cresc.dev", href: "mailto:hi@cresc.dev" },
        {
          text: "GitHub Discussions",
          href: "https://github.com/reactnativecn/react-native-update/discussions",
          external: true,
        },
      ],
    },
    {
      title: "Terms & Policies",
      links: [
        { text: "User Agreement", href: "https://cresc.dev/policy/" },
        { text: "Privacy Policy", href: "https://cresc.dev/policy/#privacy" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { text: "FAQ", href: "/docs/faq" },
        { text: "CodePush Alternative", href: "/codepush-alternative" },
        { text: "CodePush Migration", href: "/codepush-migration-checklist" },
        { text: "Expo Updates vs Cresc", href: "/expo-updates-vs-cresc" },
        {
          text: "GitHub Issues",
          href: "https://github.com/reactnativecn/react-native-update/issues",
          external: true,
        },
      ],
    },
    {
      title: "Links",
      links: [
        { text: "React Native OTA Guide", href: "/react-native-ota-updates" },
        { text: "Expo Pricing vs Cresc", href: "/expo-pricing-vs-cresc" },
        { text: "llms.txt", href: "/llms.txt" },
        { text: "llms-full.txt", href: "/llms-full.txt" },
        {
          text: "React Native",
          href: "https://reactnative.dev/",
          external: true,
        },
        {
          text: "ReactJS",
          href: "https://react.dev/",
          external: true,
        },
      ],
    },
  ];

  return (
    <footer className="bg-[#f1e6d6] text-[#5f483c] mt-auto border-t border-[#ddcdb3]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="cresc-display text-[#2d1d15] font-semibold text-2xl mb-5 tracking-wide">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.text}>
                    {link.href ? (
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[#6a5245] hover:text-[#7a3b2e] transition-colors duration-200 text-sm leading-relaxed"
                      >
                        {link.text}
                      </a>
                    ) : (
                      <span className="text-[#6a5245] text-sm leading-relaxed">
                        {link.text}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#ddcdb3]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-[#7a6558]">
            <p>© {new Date().getFullYear()} CHARMLOT PTE. LTD.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
