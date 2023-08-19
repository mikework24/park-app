//Router
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

//UI
import { Button } from '@mui/material'
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║     function ParkplatzVorschau (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function ParkplatzVorschau(props) {

  const navigate = useNavigate()

  /* ════════ Uhrzeit Formatieren ════════ */
  let uhrzeit = "";
  if (props.parkplatzNeu.uhrzeitAb.includes(":")) {
    const [st, min] = props.parkplatzNeu.uhrzeitAb.split(":");
    uhrzeit += `${st}:${min.length === 1 ? "0" + min : min} - `
  }
  if (props.parkplatzNeu.uhrzeitBis.includes(":")) {
    const [st, min] = props.parkplatzNeu.uhrzeitBis.split(":");
    uhrzeit += `${st}:${min.length === 1 ? "0" + min : min} Uhr`
  }

  /* ════════ Datum Formatieren ════════ */
  let zeitraum = ""

  if (props.parkplatzNeu.datumFestlegen) {
    const datumAb = new Date(props.parkplatzNeu.datumAb);
    const datumBis = new Date(props.parkplatzNeu.datumBis);

    zeitraum += `${datumAb.getDate()}.${datumAb.getMonth()}.${datumAb.getFullYear()}`

    if (datumAb !== datumBis) {
      zeitraum += ` - ${datumBis.getDate()}.${datumBis.getMonth()}.${datumBis.getFullYear()}`
    }
  }

  /* ════════ Wochentage Formatieren ════════ */
  let wochentage = ""
  wochentage += props.parkplatzNeu.montag ? "Mo" : ""
  wochentage += props.parkplatzNeu.dienstag ? (wochentage.length > 0 ? ", Di" : "Di") : ""
  wochentage += props.parkplatzNeu.mittwoch ? (wochentage.length > 0 ? ", Mi" : "Mi") : ""
  wochentage += props.parkplatzNeu.donnerstag ? (wochentage.length > 0 ? ", Do" : "Do") : ""
  wochentage += props.parkplatzNeu.freitag ? (wochentage.length > 0 ? ", Fr" : "Fr") : ""
  wochentage += props.parkplatzNeu.samstag ? (wochentage.length > 0 ? ", Sa" : "Sa") : ""
  wochentage += props.parkplatzNeu.sonntag ? (wochentage.length > 0 ? ", So" : "So") : ""

  return (
    <div className="App">
      <AppHeader titel="Parkplatz Vorschau" back={() => { navigate("/parkplatz-anlegen4") }} menu={true} />

      <main id='main'>

        {/* ════════ Überschrift & Editieren Button ════════ */}
        <div className="flex-box">
          <h1>Alles richtig?</h1>

          <Fab color="secondary" size="medium" aria-label="edit" onClick={() => { navigate("/parkplatz-anlegen") }}>
            <EditIcon />
          </Fab>
        </div>

        {/* ════════ Box Adresse ════════ */}
        <div className="flexBox">
          <div className="pad8">
            <strong>Adresse</strong><br />
            <span>{props.parkplatzNeu.adresse}</span>
          </div>
        </div>

        {/* ════════ Box Preise ════════ */}
        <div className="flexBox">
          <div className="pad8">
            <strong>Preis{props.parkplatzNeu.preis && "e"}</strong><br />
            {props.parkplatzNeu.preis && <><span>{props.parkplatzNeu.preis} € / Stunde</span><br /></>}
            {props.parkplatzNeu.preisOptionen && props.parkplatzNeu.preisTag !== "" && <><span>{props.parkplatzNeu.preisTag} € / Tag</span><br /></>}
            {props.parkplatzNeu.preisOptionen && props.parkplatzNeu.preisWoche !== "" && <><span>{props.parkplatzNeu.preisWoche} € / Woche</span><br /></>}
            {props.parkplatzNeu.preisOptionen && props.parkplatzNeu.preisMonat !== "" && <><span>{props.parkplatzNeu.preisMonat} € / Monat</span><br /></>}
          </div>

          {/* ════════ Box Abmessungen ════════ */}
          <div className="pad8">
            <strong>Größe</strong><br />
            <span>Breite: {props.parkplatzNeu.breite} cm</span><br />
            <span>Länge: {props.parkplatzNeu.laenge} cm</span><br />
            <span>Höhe: {props.parkplatzNeu.hoehe} cm</span><br />
            <span>Kg: {props.parkplatzNeu.kg} kg</span>
          </div>
        </div>

        {/* ════════ Box Zeitraum ════════ */}
        <div className="flexBox">
          <div className="pad8">
            {zeitraum && <><strong>Zeitraum: </strong>{zeitraum}<br /></>}
            <strong>Uhrzeit: </strong>{uhrzeit}<br />
            <strong>Wochentage: </strong>{wochentage}
            <br />
          </div>
        </div>

        {/* ════════ Box Beschreibung ════════ */}
        {props.parkplatzNeu.beschreibung &&
          <div className="flexBox">
            <div className="pad8">
              <strong>Beschreibung</strong><br />
              {props.parkplatzNeu.beschreibung}
              <br />
            </div>
          </div>
        }

        {/* ════════ Box Details ════════ */}
        <div className="flexBox">
          {
            props.parkplatzNeu.parkplatzDetails &&
            <div className="pad8 mHeight90">
              <strong>Besonderheiten</strong><br />
              <ul>
                {props.parkplatzNeu.extraBreit && <li>Breiter Parkplatz</li>}
                {props.parkplatzNeu.barrierefrei && <li>Barrierefreie</li>}
                {props.parkplatzNeu.ueberdachung && <li>Überdachung</li>}
                {props.parkplatzNeu.abgeschlossen && <li>Abgeschlossen</li>}
                {props.parkplatzNeu.garage && <li>Garage</li>}
                {props.parkplatzNeu.tankstelle && <li>Tankstelle in der Nähe</li>}
                {props.parkplatzNeu.anbindung && <li>Anschluss ÖPNV</li>}
                {props.parkplatzNeu.ladestation && <li>Ladestation</li>}
              </ul>
            </div>
          }
          <div className="pad8 mHeight90">
            <strong>Fotos</strong>
          </div>
        </div>

        <div className="center buttonBox">

          {/* ════════ Button Abbrechen ════════ */}
          <Button color="secondary" variant="contained"
            onClick={() => { navigate("/") }}>Abbrechen</Button>

          {/* ════════ Button Speichern ════════ */}
          <Button color="hightlight" variant="contained"
            onClick={() => { props.parkplatzHinzufuegen(props.parkplatzNeu, () => { navigate("/anbieten") }) }}>Speichern</Button>
        </div>

      </main >

      <AppFooter />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkplatzVorschau);