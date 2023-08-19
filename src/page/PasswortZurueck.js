import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import { Button, TextField } from '@mui/material'

// Components
import AppHeader from '../components/AppHeader';

/*
╔═══════════════════════════════════════════╗
║      function PasswortZurueck (Seite)     ║
╚═══════════════════════════════════════════╝
*/
function PasswortZurueck(props) {

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Passwort Zurücksetzen" back={() => { navigate("/") }} menu={true} />

      <main id='main'>
        <h1>Passwort Zurücksetzen!</h1>
        <p>Tragen Sie bitte Ihre Email ein.</p>

        {/* ════════ Eingabefeld Email ════════ */}
        <div>
          <TextField label="Email" variant="filled" fullWidth required margin="normal" />
        </div>

        <br />

        <p>Sie erhalten nach dem Bestätigen eine Email von uns.</p>

        <br />

        {/* ════════ Button Bestätigen ════════ */}
        <div className="center">
          <Button color="hightlight" variant="contained" onClick={() => { navigate("/") }}>Bestätigen</Button>
        </div>

        <br />

      </main>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswortZurueck);
