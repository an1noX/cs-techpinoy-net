import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const GameManual = () => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (id: number) => {
    setExpandedSections(prev => 
      prev.includes(id) 
        ? prev.filter(sectionId => sectionId !== id)
        : [...prev, id]
    );
  };

  const manualSections = [
    { 
      id: 1, 
      title: "INSTALLATION", 
      content: "1. Download the zip file. Extract and Install\n2. If password is required for the installation, use:\n   password: cs.techpinoy.net\n3. Then find the Counter-Strike 1.3 in your desktop\n4. Configure your settings (video mode). Select OpenGL 800X600"
    },
    { 
      id: 2, 
      title: "CONFIGURATION", 
      content: "Video Settings:\n- Resolution: 800x600 or 1024x768\n- Color depth: 16-bit recommended\n- Brightness: Adjust for visibility\n\nControls:\n- WASD: Movement\n- Mouse: Look/Aim\n- Left Click: Fire\n- Right Click: Secondary fire"
    },
    { 
      id: 3, 
      title: "JOINING_A_SERVER", 
      content: "1. Open server browser\n2. Filter by ping and players\n3. Double-click to join\n4. Wait for map download\n5. Choose team (T/CT)\n6. Select weapon loadout\n\nIf not yet connected, you can manually join by accessing the console by pressing '~' then typing the server IP or address using /connect:\n/connect cs.techpinoy.net"
    },
    { 
      id: 4, 
      title: "GAMING_TIPS", 
      content: "- Keep crosshair at head level\n- Learn spray patterns\n- Use sound to locate enemies\n- Buy armor and defuse kit\n- Communicate with team\n- Practice on aim_map servers"
    }
  ];

  return (
    <div id="manual" className="py-16 px-6 bg-black/60 backdrop-blur-md">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-orange-400 font-mono text-xs mb-2">
            ==========================================
          </div>
          <h2 className="text-3xl font-mono text-orange-400 mb-2">// GAME_MANUAL //</h2>
          <div className="text-orange-400 font-mono text-xs">
            ==========================================
          </div>
        </div>
        
        <div className="space-y-4">
          {manualSections.map((section) => (
            <Card key={section.id} className="bg-black/90 border-orange-500/50 hover:border-orange-400 transition-all">
              <CardContent className="p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <span className="text-orange-400 font-mono">
                    [{section.id}] {section.title}
                  </span>
                  <div className="text-orange-400">
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </div>
                {expandedSections.includes(section.id) && (
                  <div className="mt-4 p-4 bg-black/80 border border-orange-500/30">
                    <pre className="text-orange-300 font-mono text-sm whitespace-pre-wrap">
                      {section.content}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameManual;
