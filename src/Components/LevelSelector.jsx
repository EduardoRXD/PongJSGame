import { useState } from "react";

function LevelSelector({ onClick }) {
  const [visible, setVisible] = useState(true);
  const [showDifficulty, setShowDifficulty] = useState(false);

  if (!visible) return null;

  return (
    <div className="holder" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "400px", height: "500px", background: "#eee" }}>

        {!showDifficulty ? 
          (<>
            <button onClick={() => { onClick([0]); setVisible(false) }}>Singleplayer</button>
            <button onClick={() => setShowDifficulty(true)}>Singleplayer+Bot</button>
            <button onClick={() => { onClick([2]); setVisible(false) }}>Multiplayer</button>
          </>) : 
            (<>
              <button onClick={() => { onClick([1,0]); setVisible(false) }}>Facil</button>
              <button onClick={() => { onClick([1,1]); setVisible(false) }}>Medio</button>
              <button onClick={() => { onClick([1,2]); setVisible(false) }}>Dificil</button>
            </>)
        }

      </div>
    </div>
  );
}

export default LevelSelector;
