import React, { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const tg = window.Telegram?.WebApp;

function App() {
  const sigCanvas = useRef(null);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  const clear = () => sigCanvas.current.clear();

  const submit = () => {
    if (sigCanvas.current.isEmpty()) {
      tg?.showAlert("Please provide a signature!");
      return;
    }

    // Get signature as Base64 string
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    // Send data back to the bot
    if (tg) {
      tg.sendData(JSON.stringify({
        source: 'signature_app',
        image: dataURL
      }));
    } else {
      console.log("Base64 Image:", dataURL);
      alert("App is not running inside Telegram.");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Draw Your Signature</h3>
      
      <div style={styles.canvasHolder}>
        <SignatureCanvas 
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }}
        />
      </div>

      <div style={styles.btnRow}>
        <button onClick={clear} style={styles.btnClear}>Clear</button>
        <button onClick={submit} style={styles.btnSubmit}>Submit</button>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    display: 'flex', flexDirection: 'column', alignItems: 'center', 
    padding: '20px', height: '100vh', backgroundColor: '#f9f9f9' 
  },
  title: { marginBottom: '15px', color: '#333' },
  canvasHolder: { border: '2px solid #000', borderRadius: '8px', background: '#fff' },
  btnRow: { marginTop: '20px', display: 'flex', gap: '10px' },
  btnSubmit: { padding: '10px 20px', backgroundColor: '#0088cc', color: '#fff', border: 'none', borderRadius: '5px' },
  btnClear: { padding: '10px 20px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px' }
};

export default App;