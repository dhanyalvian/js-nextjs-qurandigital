//- components/footer-comp.tsx

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="
      w-full
      bg-quran-footer
      p-5 text-quran-subtitle text-center mt-auto text-xs"
    >
      <ul className="list-none inline-flex divider-x-dot">
        <li>© 2025 <Link href="mailto:dhanyalvian@gmail.com">Dhany Noor Alfian</Link>. All rights reserved.</li>
      </ul>
    </footer>
  );
}

export default Footer;
