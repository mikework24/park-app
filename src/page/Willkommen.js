import { useNavigate } from 'react-router-dom';

// MUI
import { Button } from '@mui/material'

// Components
import AppHeader from '../components/AppHeader';

/*
╔═══════════════════════════════════════════╗
║      function ParkplatzAnlegen (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function Willkommen() {

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Anmelden oder Registrieren" back={false} menu={true} />

      <main id='main'>
        <h1>Herzlich Willkommen!</h1>
        <p>Beim Privaten Parkplatz Sharing.</p>
        <div className="bg1 center pad30">
          <img src={require('../img/sharing.svg').default} alt="Parkplatz Sharing" />
        </div>

        {/* ════════ Anmelden ════════ */}
        <p>Ich habe bereits ein Konto.</p>
        <div className="center buttonBox">
          <Button color="secondary" variant="contained" onClick={() => { navigate("/anmelden") }}>Anmelden</Button>
        </div>

        {/* ════════ Registrieren ════════ */}
        <p>Ich bin das erste Mal hier.</p>
        <div className="center buttonBox">
          <Button color="secondary" variant="contained" onClick={() => { navigate("/registrieren") }}>Registrieren</Button>
        </div>

      </main>
    </div>
  );
}

export default Willkommen;
