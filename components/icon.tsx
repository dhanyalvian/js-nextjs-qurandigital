//- components/icon.tsx

import { Bookmark, BookOpenText, Play, Square } from "lucide-react";

export const Icon = ({ type, size = 18, isActive = false }: { type: string, size?: number, isActive?: boolean }) => {
  let iconClass = 'icon-wrapper';
  
  if (isActive) {
    iconClass += ' icon-wrapper-fill';
  }
  
  switch (type) {
    case 'play':
      return <Play size={size} className={iconClass} />;
    case 'stop':
      return <Square size={size} className={iconClass} />
    case 'tafsir':
      return <BookOpenText size={size} className={iconClass} />
    case 'bookmark':
      return <Bookmark size={size} className={iconClass} />
    default:
      return <Square size={size} className={iconClass} />;
  }
};
