import { useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

export function usePlayerJoinToasts() {
  const lastSeenCount = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const poll = () => {
      // Add a cache-busting query parameter
      fetch(`/playerjoinlog.txt?cb=${Date.now()}`)
        .then(res => res.text())
        .then(text => {
          if (!isMounted) return;
          const lines = text.trim().split('\n').filter(Boolean);
          if (lines.length > lastSeenCount.current) {
            const newLines = lines.slice(lastSeenCount.current);
            newLines.forEach(line => {
              const [name, ip, datetime] = line.split(',');
              if (name && datetime) {
                const [date, time] = datetime.split(' ');
                toast({
                  title: `[${date} at ${time}]`,
                  description: `${name} has joined the game`,
                });
              }
            });
            lastSeenCount.current = lines.length;
          }
        })
        .catch(() => {});
    };

    poll();
    const interval = setInterval(poll, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);
} 