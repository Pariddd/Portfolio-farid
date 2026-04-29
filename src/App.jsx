import { useState } from "react";
import Preloader from "./Preloader";
import Portfolio from "./Portfolio";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Portfolio selalu mounted di belakang — tidak ada blank gap */}
      <Portfolio startAnimation={loaded} />

      {/* Preloader overlay di atas, hilang saat selesai */}
      {!loaded && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
          <Preloader onComplete={() => setLoaded(true)} />
        </div>
      )}
    </div>
  );
}
