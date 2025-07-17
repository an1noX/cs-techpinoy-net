import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const ServerList = () => {
  const copyToClipboard = (ip: string, serverName: string) => {
    navigator.clipboard.writeText(ip).then(() => {
      toast({
        title: "IP Copied",
        description: `${serverName} IP address copied to clipboard: ${ip}`,
      });
    }).catch(() => {
      toast({
        title: "Copy Failed",
        description: "Failed to copy IP address to clipboard",
        variant: "destructive",
      });
    });
  };

  const servers = [
    {
      name: "CsPlay TechPinoy Public Server",
      ip: "cs.techpinoy.net",
      players: "32/32",
      ping: "3-20ms",
      status: "ONLINE",
      map: "de_dust2"
    },
    {
      name: "OFFICE_CLASSIC_EU",
      ip: "134.75.32.12:27015",
      players: "12/16",
      ping: "78ms",
      status: "OFFLINE",
      map: "cs_office"
    },
    {
      name: "AZTEC_LEGENDS_ASIA",
      ip: "203.45.67.123:27015",
      players: "8/16",
      ping: "125ms",
      status: "OFFLINE",
      map: "de_aztec"
    },
    {
      name: "ITALY_NOSTALGIA_USA",
      ip: "187.89.12.34:27015",
      players: "14/16",
      ping: "52ms",
      status: "OFFLINE",
      map: "cs_italy"
    },
    {
      name: "NUKE_NEON_ARENA_USA",
      ip: "89.12.34.56:27015",
      players: "10/16",
      ping: "38ms",
      status: "OFFLINE",
      map: "de_nuke"
    },
    {
      name: "CYBERPUNK_STATION_EU",
      ip: "234.56.78.90:27015",
      players: "13/16",
      ping: "89ms",
      status: "OFFLINE",
      map: "de_dust"
    }
  ];

  return (
    <div id="servers" className="py-16 px-6 bg-black/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-orange-400 font-mono text-xs mb-2">
            ==========================================
          </div>
          <h2 className="text-3xl font-mono text-orange-400 mb-2">// SERVER_LIST //</h2>
          <div className="text-orange-400 font-mono text-xs">
            ==========================================
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {servers.map((server, index) => (
            <Card key={index} className="bg-black/90 border-orange-500/50 hover:border-orange-400 transition-all hover:shadow-lg hover:shadow-orange-400/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-orange-400 font-mono text-sm mb-1">
                      [{String(index + 1).padStart(2, '0')}] {server.name}
                    </div>
                    <div className="text-orange-600 font-mono text-xs mb-1">
                      {server.ip} | MAP: {server.map}
                    </div>
                    <div className="flex gap-4 text-xs font-mono">
                      <span className="text-orange-300">PLAYERS: {server.players}</span>
                      <span className="text-orange-300">PING: {server.ping}</span>
                      <span className={`${
                        server.status === 'ONLINE' ? 'text-orange-400' : 
                        server.status === 'FULL' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {server.status}
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => copyToClipboard(server.ip, server.name)}
                    className="bg-orange-600 hover:bg-orange-500 text-black font-mono text-xs px-4 py-2 border border-orange-400 transition-all hover:shadow-md hover:shadow-orange-400/30"
                  >
                    [COPY_IP]
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerList;
