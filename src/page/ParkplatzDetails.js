//Router
import { useParams, useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

//UI
import { Button } from '@mui/material'

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║      function ParkplatzDetails (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function ParkplatzDetails(props) {

  /* ════════ Parameter werden aus Url übernommen ════════ */
  const PARAMS = useParams()
  const parkplatz = props.suchergebnis[PARAMS.id]

  const navigate = useNavigate()

  if (props.suchergebnis.length === 0 || props.suchergebnis.length < PARAMS.id) {

    /* ════════ Das aufrufen der Parkplatz details ist nur nach einer Suche möglich ════════ */
    return (
      <div className="App">
        <AppHeader titel="Parkplatz Suche" back={false} menu={true} />

        <main id='main'>
          <h1>Suchanfrage abgelaufen</h1>
          <br />
          
          {/* ════════ IMG Parkplatz Sharing ════════ */}
          <div className="bgPrimary center pad30">
            <img src={require('../img/sharing.svg').default} alt="Parkplatz Sharing" />
          </div>

          <br />

          <h2>Starte eine neue Parkplatz suche</h2>

          {/* ════════ Button Parkplatz suchen ════════ */}
          <div className="center buttonBox">
            <Button color="hightlight" variant="contained" onClick={() => { navigate("/suche") }}>Parkplatz suchen</Button>
          </div>

        </main>

        <AppFooter />
      </div>
    );
  }

  // Eigentlicher Inhalt der Parkplatz Details

  // Uhrzeit Formatieren
  let uhrzeit = ""
  if (parkplatz.uhrzeitAb.includes(":")) {
    const [st, min] = parkplatz.uhrzeitAb.split(":");
    uhrzeit += `${st}:${min.length === 1 ? "0" + min : min} - `
  }
  if (parkplatz.uhrzeitBis.includes(":")) {
    const [st, min] = parkplatz.uhrzeitBis.split(":");
    uhrzeit += `${st}:${min.length === 1 ? "0" + min : min} Uhr`
  }

  // Datum Formatieren
  let zeitraum = ""
  if (parkplatz.datumFestlegen) {
    if (parkplatz.datumAb.includes("-")) {
      const datumAb = parkplatz.datumAb.split("-");
      zeitraum += `${datumAb[1]}.${datumAb[2]}.${datumAb[0]}`
    }
    zeitraum += " - "
    if (parkplatz.datumBis.includes("-")) {
      const datumBis = parkplatz.datumBis.split("-");
      zeitraum += `${datumBis[1]}.${datumBis[2]}.${datumBis[0]}`
    }
  }

  // Wochentage Formatieren
  let wochentage = ""
  wochentage += parkplatz.montag == 1 ? "Mo" : ""
  wochentage += parkplatz.dienstag == 1 ? (wochentage.length > 0 ? ", Di" : "Di") : ""
  wochentage += parkplatz.mittwoch == 1 ? (wochentage.length > 0 ? ", Mi" : "Mi") : ""
  wochentage += parkplatz.donnerstag == 1 ? (wochentage.length > 0 ? ", Do" : "Do") : ""
  wochentage += parkplatz.freitag == 1 ? (wochentage.length > 0 ? ", Fr" : "Fr") : ""
  wochentage += parkplatz.samstag == 1 ? (wochentage.length > 0 ? ", Sa" : "Sa") : ""
  wochentage += parkplatz.sonntag == 1 ? (wochentage.length > 0 ? ", So" : "So") : ""

  const abDatum = new Date(props.suche.ab).toLocaleString('de-DE');
  const bisDatum = new Date(props.suche.bis).toLocaleString('de-DE');

  return (
    <div className="App">
      <AppHeader titel="Parkplatz" back={() => { navigate("/suchergebnisse") }} menu={true} />

      <main id='main'>

        <div className="flexBox">
          <div className="pad8">
            <strong>Adresse: </strong>{props.suche.ort}<br />
            {
              props.suche.ab &&
              <> <strong>Datum: </strong>{abDatum.substring(0, abDatum.length - 3)} Uhr</>
            }
            {
              props.suche.bis &&
              <><strong> - </strong>{bisDatum.substring(0, bisDatum.length - 3)} Uhr</>
            }
          </div>
        </div>
        <br />

        <div className="flex center">
          <img src={parkplatz.foto1} alt={"Parkplatze aus " + props.suche.ort} />
          {parkplatz.foto2 && <img src={parkplatz.foto2} alt={"Parkplatze aus " + props.suche.ort} />}
          {parkplatz.foto3 && <img src={parkplatz.foto3} alt={"Parkplatze aus " + props.suche.ort} />}
          {parkplatz.foto4 && <img src={parkplatz.foto4} alt={"Parkplatze aus " + props.suche.ort} />}
        </div>

        <div className="center buttonBox">
          <Button color="secondary" variant="contained"
            onClick={() => { navigate(`/nachrichten/${parkplatz.userID}/${parkplatz.id}`) }}>Kontaktieren</Button>

          <Button color="hightlight" variant="contained"
            onClick={() => {
              props.buchungErstellen(props.user, props.suche, parkplatz, () => { navigate("/buchungen") })
            }}>Buchen</Button>
        </div>

        <div className="flexBox">
          <div className="pad8">
            <strong>Preis{parkplatz.preis && "e"}</strong><br />
            {parkplatz.preis && <><span>{parkplatz.preis} € / Stunde</span><br /></>}
            {parkplatz.preisOptionen == 1 && parkplatz.preisTag != 0 && <><span>{parkplatz.preisTag} € / Tag</span><br /></>}
            {parkplatz.preisOptionen == 1 && parkplatz.preisWoche != 0 && <><span>{parkplatz.preisWoche} € / Woche</span><br /></>}
            {parkplatz.preisOptionen == 1 && parkplatz.preisMonat != 0 && <><span>{parkplatz.preisMonat} € / Monat</span><br /></>}
          </div>
          <div className="pad8">
            <strong>Größe</strong><br />
            <span>Breite: {parkplatz.breite} cm</span><br />
            <span>Länge: {parkplatz.laenge} cm</span><br />
            <span>Höhe: {parkplatz.hoehe} cm</span><br />
            <span>Kg: {parkplatz.kg} kg</span>
          </div>
        </div>

        <div className="flexBox">
          <div className="pad8">
            {zeitraum == 1 && <><strong>Zeitraum: </strong>{zeitraum}<br /></>}
            <strong>Uhrzeit: </strong>{uhrzeit}<br />
            <strong>Wochentage: </strong>{wochentage}
            <br />
          </div>
        </div>

        {
          parkplatz.beschreibung == 1 &&
          <div className="flexBox">
            <div className="pad8">
              <strong>Beschreibung</strong><br />
              {parkplatz.beschreibung}
              <br />
            </div>
          </div>
        }

        <div className="flexBox">
          {
            parkplatz.parkplatzDetails == 1 &&
            <div className="pad8 mHeight90">
              <strong>Besonderheiten</strong><br />
              <ul>
                {parkplatz.extraBreit == 1 && <li>Breiter Parkplatz</li>}
                {parkplatz.barrierefrei == 1 && <li>Barrierefreie</li>}
                {parkplatz.ueberdachung == 1 && <li>Überdachung</li>}
                {parkplatz.abgeschlossen == 1 && <li>Abgeschlossen</li>}
                {parkplatz.garage == 1 && <li>Garage</li>}
                {parkplatz.tankstelle == 1 && <li>Tankstelle in der Nähe</li>}
                {parkplatz.anbindung == 1 && <li>Anschluss ÖPNV</li>}
                {parkplatz.ladestation == 1 && <li>Ladestation</li>}
              </ul>
            </div>
          }
        </div>

      </main >

      <AppFooter />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkplatzDetails);