//- components/icon.tsx

import {
  BookmarkPlus,
  BookOpenText,
  Copy,
  Play,
  Share2,
  Square,
} from "lucide-react";

export const Icon = ({ type, size = 18, isActive = false, isFill = false }: { type: string, size?: number, isActive?: boolean, isFill?: boolean }) => {
  let iconClass = 'icon-wrapper';
  
  if (isFill) {
    iconClass += ' icon-wrapper-fill';

    if (isActive) {
      iconClass += '-active';
    }
  } else {
    if (isActive) {
      iconClass += ' icon-wrapper-active';
    }
  }

  switch (type) {
    case 'copy':
      return <Copy size={size} className={iconClass} />;
    case 'play':
      return <Play size={size} className={iconClass} />;
    case 'stop':
      return <Square size={size} className={iconClass} />;
    case 'tafsir':
      return <BookOpenText size={size} className={iconClass} />;
    case 'bookmark':
      return <BookmarkPlus size={size} className={iconClass} />;
    case 'share':
      return <Share2 size={size} className={iconClass} />;
    default:
      return <Square size={size} className={iconClass} />;
  }
};
