import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import { Switch, Button, TextField, FormControlLabel, Checkbox, FormGroup } from '@mui/material'

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import CheckboxIcon from '../components/CheckboxIcon';

/*
╔═══════════════════════════════════════════╗
║     function ParkplatzAnlegen2 (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function ParkplatzAnlegen2(props) {

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Parkplatz Anlegen" back={() => { navigate("/parkplatz-anlegen") }} menu={true} />

      <main id='main'>

        {/* ════════ Fortschitts Anzeige des Neuen Parkplatzes ════════ */}
        <div className="center">
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 1" onClick={() => { navigate("/parkplatz-anlegen") }} />
          <img src={require('../img/punktG.svg').default} alt="Abschnitt 2" />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 3" />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 4" />
        </div>

        <h1>Parkplatz Größe</h1>

        {/* ════════ Checkbox Parkplatz klein ════════ */}
        <CheckboxIcon titel="Parkplatz klein" text="300 cm x 400cm | z.B. VW Polo" onClick={() => {
          props.parkplatzForm({
            target: { name: "parkplatzGroesse", value: "0" }
          })
        }}
          aktiv={props.parkplatzNeu.parkplatzGroesse === "0" ? true : undefined}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="54.182" height="33.366" viewBox="0 0 54.182 33.366">
              <g className="stroke" fill="none" stroke="#fff">
                <g transform="translate(3.64 19.366)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <g transform="translate(34.64 19.366)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <path strokeWidth="2" d="M36.14 27.866h-20m-10.9 0s-4.157-.728-4.22-2.429a21.383 21.383 0 0 1 3.338-12.6C6.994 6.486 9.04.996 13.758.996h12.829c7.684.189 13.582 10.407 17.7 13.2 5.4 1.3 6.184 3.367 7.318 4.879s2.315 4.216.615 6.357-5.039 2.429-5.039 2.429" />
                <path d="M43.29 13.738H25.979c-2.283 0-2.8-1.241-2.8-2.8V1.616" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          } />

        {/* ════════ Checkbox Parkplatz mittel ════════ */}
        <CheckboxIcon titel="Parkplatz mittel" text="300 cm x 500cm | z.B. VW Passat" onClick={() => {
          props.parkplatzForm({
            target: { name: "parkplatzGroesse", value: "1" }
          })
        }}
          aktiv={props.parkplatzNeu.parkplatzGroesse === "1" ? true : undefined}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="60.343" height="31.404" viewBox="0 0 60.343 31.404">
              <g className="stroke" fill="none" stroke="#fff">
                <g transform="translate(4.615 17.404)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <g transform="translate(41.615 17.404)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <path strokeWidth="2" d="M43.115 25.904h-26" />
                <path d="M5.975 25.904c-3.753-.424-4.842-2.351-4.963-4.711s1.592-10.463 11.1-10.7c2.663-7.627 3.194-9.488 5.629-9.488h17.157c6.37 2.518 9.275 7.905 11.031 9.9 3.464 1.386 10.27 2.1 11.4 3.607a14.775 14.775 0 0 1 1.873 8.965c-.562 2.825-5.039 2.429-5.039 2.429" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path strokeWidth="2" d="M31.115 1v11" />
                <path d="M46.063 11.093H22.639a3 3 0 0 1-3.265-3.265V1.65" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          } />

        {/* ════════ Checkbox Parkplatz groß ════════ */}
        <CheckboxIcon titel="Parkplatz groß" text="300 cm x 600cm |  VW T6" onClick={() => {
          props.parkplatzForm({
            target: { name: "parkplatzGroesse", value: "2" }
          })
        }}
          aktiv={props.parkplatzNeu.parkplatzGroesse === "2" ? true : undefined}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="62.563" height="36.14" viewBox="0 0 62.563 36.14">
              <g className="stroke" fill="none" stroke="#fff">
                <g transform="translate(-26.666 -260.86) translate(30 283)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <g transform="translate(-26.666 -260.86) translate(71 283)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <path strokeWidth="2" d="M72.5 291.5h-30" transform="translate(-26.666 -260.86)" />
                <path d="M31.1 291.5h-3.43v-24.84c0-3.876 2.864-4.8 4.957-4.8s33.545.092 33.545.092c3.457 0 5.354.259 5.354 2.887 13.735.093 13.072 12.478 15.039 14.76s1.615 11.9 1.615 11.9h-4.282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-26.666 -260.86)" />
                <path d="M71.522 265.351v9.976l3.379 3.851h10.682" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-26.666 -260.86)" />
              </g>
            </svg>
          } />

        {/* ════════ Checkbox Parkplatz extra groß ════════ */}
        <CheckboxIcon titel="Parkplatz extra groß" text="350 cm x 700cm | Wohnmobil (3500kg)" onClick={() => {
          props.parkplatzForm({
            target: { name: "parkplatzGroesse", value: "3" }
          })
        }}
          aktiv={props.parkplatzNeu.parkplatzGroesse === "3" ? true : undefined}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="62.563" height="42.363" viewBox="0 0 62.563 42.363">
              <g className="stroke" fill="none" stroke="#fff">
                <g transform="translate(-26.666 -254.637) translate(30 283)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <g transform="translate(-26.666 -254.637) translate(71 283)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <path strokeWidth="2" d="M72.5 291.5h-30" transform="translate(-26.666 -254.637)" />
                <path d="M31.1 291.5h-3.43v-24.84c0-3.876 2.942-6.423 5.035-6.423H55.04c2.129 0 13.833-4.6 17.189-4.6h9.367c6.2 0 8.53 13.52 2.236 13.52h-2.507s4.393 9.46 5.239 10.442c1.967 2.282 1.615 11.9 1.615 11.9h-4.282" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-26.666 -254.637)" />
                <path d="M81.487 269.184h-9.965v7.991l3.379 3h10.682" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-26.666 -254.637)" />
              </g>
            </svg>
          } />

        <br />

        {/* ════════ Switch weitere Optionen ════════ */}
        <p>
          <FormControlLabel label="weitere Optionen"
            control={<Switch name="parkplatzMehr" color="secondary"
              disabled={props.parkplatzNeu.parkplatzGroesse === "" ? true : undefined}
              defaultValue={props.parkplatzNeu.parkplatzGroesse === "" ? false : props.parkplatzNeu.parkplatzMehr}
              checked={props.parkplatzNeu.parkplatzMehr}
              onChange={props.parkplatzForm} />} />
        </p>

        {props.parkplatzNeu.parkplatzMehr && props.parkplatzNeu.parkplatzGroesse !== "" &&
          <>
            {/* ════════ Eingabefeld Max. Breite ════════ */}
            <div className="textFieldIcon">
              <div className="icon">
                <img src={require('../img/parkplatzB.svg').default} alt="Parkplatz Sharing" />
              </div>
              <div className="text">
                <TextField name="breite" defaultValue={props.parkplatzNeu.breite} onChange={props.parkplatzForm}
                  label="Max. Breite (cm)" variant="filled" fullWidth />
              </div>
            </div>

            {/* ════════ Eingabefeld Max. Länge ════════ */}
            <div className="textFieldIcon">
              <div className="icon">
                <img src={require('../img/parkplatzL.svg').default} alt="Parkplatz Sharing" />
              </div>
              <div className="text">
                <TextField name="laenge" defaultValue={props.parkplatzNeu.laenge} onChange={props.parkplatzForm}
                  label="Max. Länge (cm)" variant="filled" fullWidth />
              </div>
            </div>

            {/* ════════ Eingabefeld Max. Höhe ════════ */}
            <div className="textFieldIcon">
              <div className="icon">
                <img src={require('../img/parkplatzH.svg').default} alt="Parkplatz Sharing" />
              </div>
              <div className="text">
                <TextField name="hoehe" defaultValue={props.parkplatzNeu.hoehe} onChange={props.parkplatzForm}
                  label="Max. Höhe (cm)" variant="filled" fullWidth />
              </div>
            </div>

            {/* ════════ Eingabefeld Max. Gewicht ════════ */}
            <div className="textFieldIcon">
              <div className="icon">
                <img src={require('../img/kg.svg').default} alt="Parkplatz Sharing" />
              </div>
              <div className="text">
                <TextField name="kg" defaultValue={props.parkplatzNeu.kg} onChange={props.parkplatzForm}
                  label="Max. Gewicht (kg)" variant="filled" fullWidth />
              </div>
            </div>
          </>
        }

        <h2>Besonderheiten</h2>

        {/* ════════ Switch weitere Optionen ════════ */}
        <p>
          <FormControlLabel label="weitere Optionen"
            control={<Switch name="parkplatzDetails" color="secondary"
              disabled={props.parkplatzNeu.parkplatzGroesse === "" ? true : undefined}
              defaultValue={props.parkplatzNeu.parkplatzGroesse === "" ? false : props.parkplatzNeu.parkplatzDetails}
              checked={props.parkplatzNeu.parkplatzDetails}
              onChange={props.parkplatzForm} />} />
        </p>

        {props.parkplatzNeu.parkplatzDetails && props.parkplatzNeu.parkplatzGroesse !== "" &&
          <>
            {/* ════════ Checkboxen der Details ════════ */}
            <FormGroup>
              <FormControlLabel name="extraBreit" label="Breiter Parkplatz (+300 cm)"
                onChange={props.parkplatzForm} checked={props.parkplatzNeu.extraBreit} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

              <FormControlLabel name="barrierefrei" label="Barrierefreie Wege"
                onChange={props.parkplatzForm} checked={props.parkplatzNeu.barrierefrei} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

              <FormControlLabel name="ueberdachung" label="Überdachung"
                onChange={props.parkplatzForm} checked={props.parkplatzNeu.ueberdachung} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

              <FormControlLabel name="abgeschlossen" label="Abgeschlossen"
                onChange={props.parkplatzForm} checked={props.parkplatzNeu.abgeschlossen} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

              <FormControlLabel name="garage" label="Garage"
                onChange={props.parkplatzForm} checked={props.parkplatzNeu.garage} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

              <FormControlLabel name="tankstelle" label="Tankstelle in der Nähe"
                onChange={props.parkplatzForm} checked={props.parkplatzNeu.tankstelle} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

              <FormControlLabel name="anbindung" label="Anschluss ÖPNV"
                onChange={props.parkplatzForm} checked={props.parkplatzNeu.anbindung} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

              <FormControlLabel name="ladestation" label="Ladestation"
                onChange={props.parkplatzForm} checked={props.parkplatzNeu.ladestation} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />
            </FormGroup>
          </>
        }

        {/* ════════ Button Übernehmen ════════ */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained"
            disabled={props.parkplatzNeu.parkplatzGroesse === "" ? true : undefined}
            onClick={() => { navigate("/parkplatz-anlegen3") }}>Übernehmen</Button>
        </div>

      </main>

      <AppFooter aktiv={2} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkplatzAnlegen2);