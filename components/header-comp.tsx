//- components/header-comp.tsx

"use client"

import Link from "next/link"
import { QuranConfig } from "@/utils/config"
import { Bookmark, BookOpenText, ChevronLeft, Search } from "lucide-react"
import { ButtonGroup } from "./ui/button-group"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Kbd, KbdGroup } from "./ui/kbd"

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
            <Link href="/" className="flex justify-start items-end gap-2">
              <BookOpenText size={26} />
              <div className="text-xl font-bold text-gray-900">{QuranConfig.metadataTitle}</div>
            </Link>
          </div>

          <ButtonGroup>
            {!homeActive && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" asChild className="rounded-xl">
                    <Link href="/">
                      <ChevronLeft />
                      <span className="hidden md:block lg:block">Back</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Back
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl cursor-pointer">
                  <Search />
                  <span className="hidden md:block lg:block">Search</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-2">
                  Search
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </KbdGroup>
                </div>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" asChild className="rounded-xl">
                  <Link href="/bookmarks" title="Bookmark">
                    <Bookmark className={`${bookmarkActive && "icon-wrapper-fill-active"}`} />
                    <span className="hidden md:block lg:block">Bookmark</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Bookmark
              </TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </div>
      </nav>
    </header>
  )
}

export default Header
