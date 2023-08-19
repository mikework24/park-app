import { useNavigate } from 'react-router-dom';

// MUI
import { Button, TextField } from '@mui/material'

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║       function FahrzeugDaten3 (Seite)     ║
╚═══════════════════════════════════════════╝
*/
function FahrzeugDaten3(props) {

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Fahrzeug eingeben" back={() => { navigate("/fahrzeug-daten2") }} menu={true} />

      <main id='main'>

        {/* ════════ Fortschitts Anzeige der Fahrzeug Anmeldung ════════ */}
        <div className="center">
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 1" onClick={() => { navigate("/fahrzeug-daten") }} />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 2" onClick={() => { navigate("/fahrzeug-daten2") }} />
          <img src={require('../img/punktG.svg').default} alt="Abschnitt 3" />
        </div>
        <h1>Fahrzeugdaten</h1>

        <h2>Fahrzeugmodell</h2>


        {/* ════════ Eingabefeld Fahrzeugmodell ════════ */}
        <div className="text">
          <TextField name="name" value={props.fahrzeugNeu.name} onChange={props.fahrzeugForm} label="Fahrzeugmodell (z.B. VW Pasat)" required variant="filled" fullWidth />
        </div>

        <h2>Kfz-Kennzeichen</h2>


        {/* ════════ Eingabefeld Kfz-Kennzeichen ════════ */}
        <div className="text">
          <TextField name="nummernschild" value={props.fahrzeugNeu.nummernschild} onChange={props.fahrzeugForm} label="Kfz-Kennzeichen" required variant="filled" fullWidth />
        </div>

        <p className="font14">Wenn du einen Parkplatz mietest, wird dem Vermieter dein Kennzeichen mitgeteilt.
          So kann er dein Auto erkennen, während du seinen Parkplatz nutzt.</p>


        {/* ════════ Button zur Vorschau ════════ */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained"
            disabled={props.fahrzeugNeu.nummernschild.length < 4 || props.fahrzeugNeu.name.length < 2 ? true : undefined}
            onClick={() => { navigate("/fahrzeug-daten-vorschau") }}>zur Vorschau</Button>
        </div>

      </main>

      <AppFooter />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FahrzeugDaten3);