import React from "react";

type TopHeaderProps = {
  onNavClick?: (sectionId: string) => void;
  onPlayersClick?: () => void;
};

const TopHeader: React.FC<TopHeaderProps> = ({ onNavClick, onPlayersClick }) => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-orange-500/50 shadow-lg">
    <div className="flex justify-between items-center p-4">
      <div className="text-orange-400 font-mono text-sm border border-orange-500 px-3 py-1 bg-black/50">
        [CS_1.3_GAMING_EDITION]
      </div>
      <div className="flex gap-8 text-orange-300 font-mono text-sm">
        <button
          onClick={onPlayersClick}
          className="hover:text-orange-400 transition-colors cursor-pointer border-b border-transparent hover:border-orange-400"
        >
          &gt; TOP PLAYERS
        </button>
      </div>
    </div>
  </div>
);

export default TopHeader; 