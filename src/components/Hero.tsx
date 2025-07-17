import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import DownloadModal from "./DownloadModal";
import TopPlayer from "./TopPlayer";

const Hero = () => {
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [showTopPlayers, setShowTopPlayers] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHeroContent(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Counter-Strike 1.3 Full Install is downloading...",
    });
  };

  const handlePlayNow = () => {
    scrollToSection('manual');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayersClick = () => {
    setShowTopPlayers(true);
  };

  const handleCloseTopPlayers = () => {
    setShowTopPlayers(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* YouTube Video Background - Fixed Position */}
      <div className="fixed inset-0 z-0 w-screen h-screen overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/000M0aPebXk?autoplay=1&mute=1&loop=1&playlist=000M0aPebXk&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=1"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
          style={{ pointerEvents: 'none', border: 0 }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      
      {/* Navigation */}
      <TopHeader onNavClick={scrollToSection} onPlayersClick={handlePlayersClick} />
      
      {/* Hero Content */}
      <DownloadModal 
        visible={showHeroContent} 
        onPlayNow={handlePlayNow} 
        handleDownload={handleDownload} 
      />

      {/* TopPlayer Modal */}
      {showTopPlayers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <TopPlayer onClose={handleCloseTopPlayers} />
        </div>
      )}

      {/* Dark overlay with scan lines effect - only show after hero content is visible */}
      {showHeroContent && (
        <>
          <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none"></div>
          <div className="absolute inset-0 z-15 opacity-20 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ff6600 2px, #ff6600 4px)',
          }}></div>
        </>
      )}
    </div>
  );
};

export default Hero;
