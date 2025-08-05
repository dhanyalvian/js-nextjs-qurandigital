//- components/back-to-top-comp.tsx

'use client';

import { ArrowUp } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  });

  const jumpToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <Fragment>
      {
        (show) ? (
          <div className="fixed bottom-0 right-0 mb-6 mr-6 z-10">
            <button
              onClick={jumpToTop}
              className="bg-quran-subtitle text-white rounded-full p-2 cursor-pointer hover:scale-[1.02] transition-all duration-200"
              title="kembali ke atas"
            >
              <ArrowUp size={24} />
            </button>
          </div>
        ) : (<Fragment />)
      }
    </Fragment>
  );
};

export default BackToTopButton;
