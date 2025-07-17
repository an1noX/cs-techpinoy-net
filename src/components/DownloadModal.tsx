import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type DownloadModalProps = {
  onPlayNow?: () => void;
  handleDownload?: () => void;
  visible?: boolean;
};

const checkFileExists = async (url: string) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
};

const DownloadModal: React.FC<DownloadModalProps> = ({ onPlayNow, handleDownload, visible = true }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  if (!visible) return null;

  const handleDownloadClick = async () => {
    setDownloading(true);
    // Check for .zip first, then .exe
    const zipUrl = "/downloads/csfull_setup.zip";
    const exeUrl = "/downloads/csfull_setup.exe";
    let url = null;
    if (await checkFileExists(zipUrl)) {
      url = zipUrl;
    } else if (await checkFileExists(exeUrl)) {
      url = exeUrl;
    }
    setDownloadUrl(url);
    setShowPasswordModal(true);
    setDownloading(false);
    if (handleDownload) handleDownload();
  };

  const handleProceedDownload = () => {
    if (downloadUrl) {
      // Start download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = downloadUrl.split('/').pop()!;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    setShowPasswordModal(false);
  };

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
        <Button
          onClick={handleDownloadClick}
          className="inline-block bg-orange-600 hover:bg-orange-500 text-black font-mono px-8 py-3 border border-orange-400 transition-all hover:shadow-lg hover:shadow-orange-400/30 rounded-md text-sm font-medium"
          disabled={downloading}
        >
          {downloading ? 'Checking...' : '[DOWNLOAD_NOW]'}
        </Button>
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

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-black border border-orange-400 rounded-lg p-8 max-w-md w-full text-center relative">
            <div className="text-2xl font-bold text-orange-400 mb-4 font-mono">Download Information</div>
            <div className="mb-4 text-orange-200 font-mono text-sm">
              If the installer asks for a password, use:
            </div>
            <div className="mb-6 text-lg font-bold font-mono" style={{ color: '#ff3333' }}>
              cs.techpinoy.net
            </div>
            <Button
              onClick={handleProceedDownload}
              className="bg-orange-600 hover:bg-orange-500 text-black font-mono px-8 py-3 border border-orange-400 transition-all hover:shadow-lg hover:shadow-orange-400/30 rounded-md text-sm font-medium"
              disabled={!downloadUrl}
            >
              Proceed with Download
            </Button>
            <Button
              onClick={() => setShowPasswordModal(false)}
              variant="outline"
              className="ml-4 border-orange-400 text-orange-400 bg-black hover:bg-orange-400 hover:text-black font-mono px-8 py-3 transition-all hover:shadow-lg hover:shadow-orange-400/30"
            >
              Cancel
            </Button>
            {!downloadUrl && (
              <div className="mt-4 text-red-500 font-mono text-xs">Download file not found. Please try again later.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadModal; 