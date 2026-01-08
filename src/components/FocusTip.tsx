import { useEffect, useState } from "react";
import { getFocusTip } from "../utils/ai";

export function FocusTip() {
  const [tip, setTip] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    getFocusTip().then((t) => {
      if (mounted) setTip(t);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!tip) return null;

  return (
    <div className="focus-tip card">
      <span className="focus-tip-label">Focus Tip</span>
      <p>{tip}</p>
    </div>
  );
}
