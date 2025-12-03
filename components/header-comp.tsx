//- components/header-comp.tsx

"use client"

import Link from "next/link"
import { QuranConfig } from "@/utils/config"
import { Bookmark, BookOpenText, ChevronLeft } from "lucide-react"
import { ButtonGroup } from "./ui/button-group"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname()
  const homeActive = (pathname == "/")
  const bookmarkActive = (pathname == "/bookmarks")

  return (
    <header className="overflow-y-scroll">
      <nav className="
        fixed top-0 left-0
        z-50
        w-full shadow-xs
        bg-quran-nav border-b border-b-quran-border-primary"
      >
        <div className="layout-width py-3 flex items-center justify-between">
          <div className="flex flex-1">
            <Link href="/" className="flex justify-start items-end gap-3">
              <BookOpenText size={26} />
              <div className="text-xl font-bold text-gray-900">{QuranConfig.metadataTitle}</div>
            </Link>
          </div>

          <ButtonGroup>
            {!homeActive && (
              <Button variant="outline" size="sm" asChild className="rounded-full">
                <Link href="/" title="Bookmark">
                  <ChevronLeft />
                  Back to Surat
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <Link href="/bookmarks" title="Bookmark">
                <Bookmark className={`${bookmarkActive && "icon-wrapper-fill-active"}`}/>
                Bookmark
              </Link>
            </Button>
          </ButtonGroup>
        </div>
      </nav>
    </header>
  )
}

export default Header
