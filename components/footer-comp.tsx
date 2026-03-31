//- components/footer-comp.tsx

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="
      w-full
      bg-quran-background
      p-5 text-quran-subtitle text-center mt-auto text-xs"
    >
      <ul className="list-none inline-flex divider-x-dot">
        <li>© 2025 <Link href="https://github.com/dhanyalvian/js-nextjs-qurandigital" className="font-semibold hover:underline" target="_blank">DigitalQuran</Link></li>
      </ul>
    </footer>
  );
}

export default Footer;
