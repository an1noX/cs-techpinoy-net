import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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

function DownloadModal({ onPlayNow, handleDownload, visible = true }: DownloadModalProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [availableFiles, setAvailableFiles] = useState<{zip: boolean, exe: boolean}>({zip: false, exe: false});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked && visible) {
      setDownloading(true);
      Promise.all([
        checkFileExists("/downloads/csfull_setup.zip"),
        checkFileExists("/downloads/csfull_setup.exe")
      ]).then(([zip, exe]) => {
        setAvailableFiles({zip, exe});
        setDownloading(false);
        setChecked(true);
      });
    }
  }, [checked, visible]);

  if (!visible) return null;

  const handleDownloadChoice = (url: string) => {
    setDownloadUrl(url);
    setShowPasswordModal(true);
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
        {downloading && (
          <Button disabled className="bg-orange-600 text-black font-mono px-8 py-3 border border-orange-400 rounded-md text-sm font-medium">
            Checking files...
          </Button>
        )}
        {!downloading && (availableFiles.zip || availableFiles.exe) ? (
          <>
            {availableFiles.zip && (
              <Button
                onClick={() => handleDownloadChoice("/downloads/csfull_setup.zip")}
                className="bg-orange-600 hover:bg-orange-500 text-black font-mono px-8 py-3 border border-orange-400 rounded-md text-sm font-medium"
              >
                Download ZIP
              </Button>
            )}
            {availableFiles.exe && (
              <Button
                onClick={() => handleDownloadChoice("/downloads/csfull_setup.exe")}
                className="bg-orange-600 hover:bg-orange-500 text-black font-mono px-8 py-3 border border-orange-400 rounded-md text-sm font-medium"
              >
                Download EXE
              </Button>
            )}
          </>
        ) : null}
        {!downloading && !availableFiles.zip && !availableFiles.exe && (
          <div className="text-red-500 font-mono text-sm">No download files available.</div>
        )}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default DownloadModal; 