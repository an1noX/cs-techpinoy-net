import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const GameArchive = () => {
  const handleDownload = (itemTitle: string, size: string) => {
    toast({
      title: "Download Started",
      description: `${itemTitle} (${size}) is downloading...`,
    });
  };

  const handleUnavailable = (itemTitle: string) => {
    toast({
      title: "File Unavailable",
      description: `${itemTitle} is currently unavailable for download.`,
      variant: "destructive"
    });
  };

  const archiveItems = [
    {
      title: "FULL_INSTALL_V1.3",
      size: "124.1MB",
      description: "Complete Counter-Strike 1.3 installation package",
      type: "[GET_FILE]",
      download: "/downloads/csfull_setup.zip"
    },
    {
      title: "HD_PLAYER_MODELS",
      size: "34.2MB",
      description: "Enhanced high-definition player models",
      type: "[GET_FILE]"
    },
    {
      title: "CUSTOM_MAPS_PACK",
      size: "67.8MB",
      description: "Collection of popular community maps",
      type: "[GET_FILE]"
    },
    {
      title: "WEAPON_SOUNDS_PACK",
      size: "12.4MB",
      description: "Enhanced weapon sound effects",
      type: "[GET_FILE]"
    },
    {
      title: "NEON_TEXTURE_PACK",
      size: "8.9MB",
      description: "Cyberpunk-style weapon textures",
      type: "[GET_FILE]"
    }
  ];

  return (
    <div id="archive" className="py-16 px-6 bg-black/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-orange-400 font-mono text-xs mb-2">
            ==========================================
          </div>
          <h2 className="text-3xl font-mono text-orange-400 mb-2">// GAME_ARCHIVE //</h2>
          <div className="text-orange-400 font-mono text-xs">
            ==========================================
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {archiveItems.map((item, index) => (
            <Card key={index} className="bg-black/90 border-orange-500/50 hover:border-orange-400 transition-all hover:shadow-lg hover:shadow-orange-400/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-orange-400 font-mono text-xs mb-1">
                      [{String(index + 1).padStart(2, '0')}] {item.title}
                    </div>
                    <div className="text-orange-600 font-mono text-xs mb-2">
                      SIZE: {item.size} | STATUS: AVAILABLE
                    </div>
                    <p className="text-orange-300 font-mono text-xs">&gt; {item.description}</p>
                  </div>
                  {item.download ? (
                    <a
                      href={item.download}
                      download
                      className="inline-block bg-orange-600 hover:bg-orange-500 text-black font-mono text-xs px-4 py-2 ml-4 border border-orange-400 transition-all hover:shadow-md hover:shadow-orange-400/30 rounded-md"
                    >
                      {item.type}
                    </a>
                  ) : (
                    <Button 
                      onClick={() => handleUnavailable(item.title)}
                      className="bg-orange-600 hover:bg-orange-500 text-black font-mono text-xs px-4 py-2 ml-4 border border-orange-400 transition-all hover:shadow-md hover:shadow-orange-400/30"
                    >
                      {item.type}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameArchive;
