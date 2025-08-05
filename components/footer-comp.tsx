//- components/footer-comp.tsx

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="
      w-full
      bg-quran-nav border-t border-t-quran-border-primary
      p-5 text-quran-subtitle text-center mt-auto text-xs"
    >
      <ul className="list-none inline-flex divider-x-dot">
        <li>© 2025 DNA.</li>
        <li><Link href="/privacy-policy" className="hover:underline">Privasi</Link></li>
        <li><Link href="/terms-of-service" className="hover:underline">Kebijakan</Link></li>
        <li><Link href="/sitemap" className="hover:underline">Peta Situs</Link></li>
      </ul>
    </footer>
  );
}

export default Footer;