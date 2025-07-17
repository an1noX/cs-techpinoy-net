import { Button } from "@/components/ui/button";
import React from "react";

type DownloadModalProps = {
  onPlayNow?: () => void;
  handleDownload?: () => void;
  visible?: boolean;
};

const DownloadModal: React.FC<DownloadModalProps> = ({ onPlayNow, handleDownload, visible = true }) => {
  if (!visible) return null;
  return (
    <div className="relative z-20 text-center bg-black/60 p-8 border border-orange-500/30">
      <div className="text-orange-400 font-mono text-xs mb-4">
        ================================
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-orange-400 font-mono tracking-wider">
        COUNTER-STRIKE 1.3
      </h1>
      <div className="text-orange-400 font-mono text-xs mb-4">
        ================================
      </div>
      <p className="text-lg md:text-xl mb-8 text-orange-300 font-mono">
        &gt; Old School Games. New School Gamers. &lt;
      </p>
      <div className="flex gap-4 justify-center flex-col sm:flex-row">
        <a
          href="/downloads/csfull_setup.zip"
          download
          onClick={handleDownload}
          className="inline-block bg-orange-600 hover:bg-orange-500 text-black font-mono px-8 py-3 border border-orange-400 transition-all hover:shadow-lg hover:shadow-orange-400/30 rounded-md text-sm font-medium"
        >
          [DOWNLOAD_NOW]
        </a>
        <Button 
          onClick={onPlayNow}
          variant="outline" 
          className="border-orange-400 text-orange-400 bg-black hover:bg-orange-400 hover:text-black font-mono px-8 py-3 transition-all hover:shadow-lg hover:shadow-orange-400/30"
        >
          [PLAY_NOW]
        </Button>
      </div>
      <div className="text-orange-600 font-mono text-xs mt-4 text-center">
        STATUS: ONLINE
      </div>
    </div>
  );
};

export default DownloadModal; 