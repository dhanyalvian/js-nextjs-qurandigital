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
        <li>© 2025 DNA. Semua hak dilindungi undang-undang.</li>
      </ul>
    </footer>
  );
}

export default Footer;