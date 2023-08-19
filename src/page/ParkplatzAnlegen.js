import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import { Switch, Button, TextField, FormControlLabel, FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║      function ParkplatzAnlegen (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function ParkplatzAnlegen(props) {

  /* ════════ voreingestellte werte des Parkplatzes ════════ */
  const now = new Date();
  const startZeit = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
  const endZeit = startZeit + (180 * 24 * 60 * 60 * 1000);


  /* ════════ Speichert die User ID im Form dokument ════════ */
  useEffect(() => {
    props.parkplatzForm({ target: { name: "userID", value: props.user.id } })
    props.parkplatzForm({ target: { name: "datumAb", value: startZeit } })
    props.parkplatzForm({ target: { name: "datumBis", value: endZeit } })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Parkplatz Anlegen" back={() => { navigate(-1) }} menu={true} />

      <main id='main'>

        {/* ════════ Fortschitts Anzeige des Neuen Parkplatzes ════════ */}
        <div className="center">
          <img src={require('../img/punktG.svg').default} alt="Abschnitt 1" />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 2" />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 3" />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 4" />
        </div>
        <h1>Parkplatz</h1>

        {/* ════════ Eingabefeld Name ════════ */}
        <div>
          <TextField name="name" required fullWidth variant="filled" margin="normal"
            value={props.parkplatzNeu.name}
            onChange={props.parkplatzForm}
            label="Name (Nur für Sie sichtbar)" />
        </div>


        {/* ════════ Eingabefeld Orte, Adresse, PLZ ════════ */}
        <div>
          <FormControl required fullWidth variant="filled" margin="normal" >
            <InputLabel htmlFor="filled-adress">
              Orte, Adresse, PLZ
            </InputLabel>

            <FilledInput name="adresse" id="filled-adress" type="text"
              value={props.parkplatzNeu.adresse}
              onChange={props.parkplatzForm}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => { }}
                    onMouseDown={() => { }}
                    edge="start" >
                    <GpsFixedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <br />


        <h2>Preise</h2>

        {/* ════════ Eingabefeld Preis / Stunde ════════ */}
        <div>
          <TextField name="preis" required fullWidth variant="filled" margin="normal"
            value={props.parkplatzNeu.preis}
            onChange={props.parkplatzForm}
            label="Preis Pro Stunde"
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }} />
        </div>

        {/* ════════ Switch weitere Optionen ════════ */}
        <p>
          <FormControlLabel label="weitere Optionen"
            control={<Switch name="preisOptionen" color="secondary"
              value={props.parkplatzNeu.preisOptionen}
              checked={props.parkplatzNeu.preisOptionen}
              onChange={props.parkplatzForm} />} />
        </p>

        {props.parkplatzNeu.preisOptionen &&
          <>
            {/* ════════ Eingabefeld Preis / Tag ════════ */}
            <div>
              <TextField name="preisTag" required fullWidth variant="filled" margin="normal"
                value={props.parkplatzNeu.preisTag}
                onChange={props.parkplatzForm}
                label="Preis/Tag"
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }} />
            </div>

            {/* ════════ Eingabefeld Preis / Woche ════════ */}
            <div>
              <TextField name="preisWoche" required fullWidth variant="filled" margin="normal"
                value={props.parkplatzNeu.preisWoche}
                onChange={props.parkplatzForm}
                label="Preis/Woche"
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }} />
            </div>

            {/* ════════ Eingabefeld Preis / Monat ════════ */}
            <div>
              <TextField name="preisMonat" required fullWidth variant="filled" margin="normal"
                value={props.parkplatzNeu.preisMonat}
                onChange={props.parkplatzForm}
                label="Preis/Monat"
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }} />
            </div>
          </>
        }

        {/* ════════ Button Übernehmen ════════ */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained"
            disabled={
              props.parkplatzNeu.name === "" ||
                props.parkplatzNeu.adresse === "" ||
                props.parkplatzNeu.preis === ""
                ?
                true : undefined
            }
            onClick={() => { navigate("/parkplatz-anlegen2") }}>Übernehmen</Button>
        </div>

      </main>

      <AppFooter aktiv={2} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkplatzAnlegen);