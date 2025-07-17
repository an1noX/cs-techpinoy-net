
const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-orange-500/50 bg-black/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-orange-400 font-mono text-xs mb-4">
            ==========================================
          </div>
          <p className="text-orange-400 font-mono text-sm mb-2">
            CS 1.3 GAMING EDITION © 2025
          </p>
          <p className="text-orange-600 font-mono text-xs mb-4">
            &gt; Built for the legends. Powered by nostalgia. &lt;
          </p>
          <div className="text-orange-600 font-mono text-xs">
            CONNECTION_STATUS: STABLE | LATENCY: LOW | SECURITY: ENCRYPTED
          </div>
        </div>
        
        <div className="flex justify-center gap-8 text-xs font-mono">
          <a href="#" className="text-orange-600 hover:text-orange-400 transition-colors border-b border-transparent hover:border-orange-400">
            &gt; GAMING_COMMUNITY
          </a>
          <a href="#" className="text-orange-600 hover:text-orange-400 transition-colors border-b border-transparent hover:border-orange-400">
            &gt; PRIVACY_POLICY
          </a>
          <a href="#" className="text-orange-600 hover:text-orange-400 transition-colors border-b border-transparent hover:border-orange-400">
            &gt; TERMS_CONDITIONS
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
