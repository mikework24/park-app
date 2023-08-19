//Router
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║      function ParkplatzAnlegen (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function Suchergebnisse(props) {

  const navigate = useNavigate()

  /* ════════ Voreingestellte Werte ════════ */
  const abDatum = new Date(props.suche.ab).toLocaleString('de-DE');
  const bisDatum = new Date(props.suche.bis).toLocaleString('de-DE');

  return (
    <div className="App">
      <AppHeader titel="Suchergebnisse" back={() => { navigate("/suche") }} menu={true} />

      <main id='main'>

        {/* ════════ Box Ort und Zeitraum ════════ */}
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

        {
          props.suchergebnis.map((parkplatz, index) => {

            /* ════════ Sucherergebnisse Auflisten ════════ */
            return (
              <div className="fahrzeugListBox" key={parkplatz.id}
                onClick={() => { navigate(`/parkplatz-details/${index}`) }} >
                <div >
                  <img src={parkplatz.foto1} alt={"Parkplatz in " + props.suche.ort} />
                </div>
                <div className="pad8">
                  <strong>Adresse: {parkplatz.adresse}</strong><br /><br />

                  {parkplatz.preis != 0 && <><span>{parkplatz.preis} € / Stunde</span><br /></>}
                  {parkplatz.preisOptionen == 1 && parkplatz.preisTag != 0 && <><span>{parkplatz.preisTag} € / Tag</span><br /></>}
                </div>

              </div>
            )
          })
        }

      </main >

      <AppFooter aktiv={1} />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Suchergebnisse);