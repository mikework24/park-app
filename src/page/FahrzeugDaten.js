import { useNavigate } from 'react-router-dom';

// MUI
import { Switch, Button, TextField, FormControlLabel } from '@mui/material'

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import CheckboxIcon from '../components/CheckboxIcon';

/*
╔═══════════════════════════════════════════╗
║       function FahrzeugDaten (Seite)      ║
╚═══════════════════════════════════════════╝
*/
function FahrzeugDaten(props) {

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Fahrzeug eingeben" back={() => { navigate("/profil") }} menu={true} />

      <main id='main'>

        {/* ════════ Fortschitts Anzeige der Fahrzeug Anmeldung ════════ */}
        <div className="center">
          <img src={require('../img/punktG.svg').default} alt="Abschnitt 1" />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 2" />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 3" />
        </div>
        <h1>Fahrzeugdaten</h1>
        <h2>Welche Größe hat dein Fahrzeug?</h2>

        {/* ════════ Fahrzeug Typen ════════ */}
        <CheckboxIcon titel="Kleinwagen" text="z. B. Smart, VW Polo" onClick={() => {
          props.fahrzeugForm({
            target: {
              name: "typ",
              value: "0"
            }
          })
        }}

          aktiv={props.fahrzeugNeu.typ === "0" ? true : undefined}
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

        <CheckboxIcon titel="Mittelklassewagen" text="z. B. VW Passat" onClick={() => {
          props.fahrzeugForm({
            target: {
              name: "typ",
              value: "1"
            }
          })
        }}
          aktiv={props.fahrzeugNeu.typ === "1" ? true : undefined}
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

        <CheckboxIcon titel="Kombi" text="z. B. VW Passat Kombi" onClick={() => {
          props.fahrzeugForm({
            target: {
              name: "typ",
              value: "2"
            }
          })
        }}
          aktiv={props.fahrzeugNeu.typ === "2" ? true : undefined}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="65.338" height="28.069" viewBox="0 0 65.338 28.069">
              <g className="stroke" fill="none" stroke="#fff">
                <g transform="translate(4.62 14.069)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <g transform="translate(45.62 14.069)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <path strokeWidth="2" d="M47.12 22.569h-30" />
                <path d="M5.72 22.569c-1.967-.726-4.721.139-4.715-6.727a33.019 33.019 0 0 1 .7-6.038S5.267 1.926 9.746 1.26c2.093 0 24.329.422 24.329.422 2.239.424 9.321 5.761 11.8 8.122 3.464 1.386 12.859 1.548 15.616 2.834s3.168 4.137 2.606 6.962-5.583 2.969-5.583 2.969" strokeWidth="2" />
                <path strokeWidth="2" d="M20.12 1.569v8.096" />
                <path d="M45.62 9.669H11.188c-.134 0-1.623-.367-1.194-1.657a71.288 71.288 0 0 1 3.8-6.629" strokeLinecap="round" strokeWidth="2" />
                <path strokeWidth="2" d="M30.12 1.569v8.096" />
              </g>
            </svg>
          } />

        <CheckboxIcon titel="Van / SUV" text="z. B. VW Sharan" onClick={() => {
          props.fahrzeugForm({
            target: {
              name: "typ",
              value: "3"
            }
          })
        }}
          aktiv={props.fahrzeugNeu.typ === "3" ? true : undefined}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="63.314" height="30.124" viewBox="0 0 63.314 30.124">
              <g className="stroke" fill="none" stroke="#fff">
                <g transform="translate(-25.38 -266.876) translate(30 283)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <g transform="translate(-25.38 -266.876) translate(71 283)" strokeWidth="3">
                  <circle cx="7" cy="7" r="7" stroke="none" />
                  <circle cx="7" cy="7" r="5.5" />
                </g>
                <path strokeWidth="2" d="M72.5 291.5h-30" transform="translate(-25.38 -266.876)" />
                <path d="M31.1 291.5c-1.967-.726-4.721.139-4.715-6.727a33.019 33.019 0 0 1 .7-6.038s4.832-10.859 6.925-10.859h26.675c7.684.189 8.973 8.706 12.437 10.092s9.6.236 11.567 2.518 3.474 4.493 2.912 7.318-3.7 3.7-3.7 3.7" strokeWidth="2" transform="translate(-25.38 -266.876)" />
                <path strokeWidth="2" d="M56.5 267.5v10.096" transform="translate(-25.38 -266.876)" />
                <path d="M72.5 277.6s-28.925-.219-30.172-.266-1.05-1.46-1.05-1.956v-6.909" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(-25.38 -266.876)" />
              </g>
            </svg>
          } />

        <CheckboxIcon titel="Kleinbus / Transporter" text="z. B. VW T6" onClick={() => {
          props.fahrzeugForm({
            target: {
              name: "typ",
              value: "4"
            }
          })
        }}
          aktiv={props.fahrzeugNeu.typ === "4" ? true : undefined}
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

        <CheckboxIcon titel="Wohnmobil" text="z. B. Knaus Sun" onClick={() => {
          props.fahrzeugForm({
            target: {
              name: "typ",
              value: "5"
            }
          })
        }}
          aktiv={props.fahrzeugNeu.typ === "5" ? true : undefined}
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

        {/* ════════ Switch zum Aktivieren von genaueren Fahrzeugdaten ════════ */}
        <p>
          <FormControlLabel control={<Switch name="genau" checked={props.fahrzeugNeu.genau == true ? true : false} onChange={props.fahrzeugForm} color="secondary" />} label="Genaue Fahrzeugmaße eingeben?" />
        </p>

        {/* ════════ Inhalt der genaueren Fahrzeugdaten ════════ */}
        {props.fahrzeugNeu.genau == true &&
          <>
            {/* ════════ Fahrzeug Breite ════════ */}
            <div className="textFieldIcon">
              <div className="icon">
                <img src={require('../img/autoB.svg').default} alt="Parkplatz Sharing" />
              </div>
              <div className="text">
                <TextField name="breite" defaultValue={props.fahrzeugNeu.breite} onChange={props.fahrzeugForm} label="Breite (cm)" variant="filled" fullWidth />
              </div>
            </div>

            {/* ════════ Fahrzeug Länge ════════ */}
            <div className="textFieldIcon">
              <div className="icon">
                <img src={require('../img/autoL.svg').default} alt="Parkplatz Sharing" />
              </div>
              <div className="text">
                <TextField name="laenge" defaultValue={props.fahrzeugNeu.laenge} onChange={props.fahrzeugForm} label="Länge (cm)" variant="filled" fullWidth />
              </div>
            </div>

            {/* ════════ Fahrzeug Höhe ════════ */}
            <div className="textFieldIcon">
              <div className="icon">
                <img src={require('../img/autoH.svg').default} alt="Parkplatz Sharing" />
              </div>
              <div className="text">
                <TextField name="hoehe" defaultValue={props.fahrzeugNeu.hoehe} onChange={props.fahrzeugForm} label="Höhe (cm)" variant="filled" fullWidth />
              </div>
            </div>

            {/* ════════ Fahrzeug Gewicht in KG ════════ */}
            <div className="textFieldIcon">
              <div className="icon">
                <img src={require('../img/kg.svg').default} alt="Parkplatz Sharing" />
              </div>
              <div className="text">
                <TextField name="kg" defaultValue={props.fahrzeugNeu.kg} onChange={props.fahrzeugForm} label="Gewicht (kg)" variant="filled" fullWidth />
              </div>
            </div>
          </>
        }

        {/* ════════ Übernehmen Button ════════ */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained"
            disabled={props.fahrzeugNeu.typ === "" ? true : undefined}
            onClick={() => { navigate("/fahrzeug-daten2") }}>Übernehmen</Button>
        </div>

      </main>

      <AppFooter />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FahrzeugDaten);