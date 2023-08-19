import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import { Button } from '@mui/material'

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import timeToDe from '../functions/timesToDe';

/*
╔═══════════════════════════════════════════╗
║         function Buchungen (Seite)        ║
╚═══════════════════════════════════════════╝
*/
function Buchungen(props) {

  /* ════════ Lade alle Objekte des Users nach erfolgreichem laden ════════ */
  useEffect(() => {
    if (props.user.id) {
      props.buchungenLaden(props.user.id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Buchungen" back={() => { navigate("/") }} menu={true} />

      <main id='main'>

        {
          props.buchungen.length === 0 ?
            <>
              {/*
              ╔═══════════════════════════════════════════╗
              ║           Inhalt keine Buchungen          ║
              ╚═══════════════════════════════════════════╝
              */}
              <div className="flexBox">
                <div className="center flexCenter mHeight90">
                  Keine Buchungen vorhanden
                </div>
              </div>
            </>
            :
            <>
              {/*
              ╔═══════════════════════════════════════════╗
              ║      Inhalt bei vorhandenen Buchungen     ║
              ╚═══════════════════════════════════════════╝
              */}
              {
                props.buchungen.map((buchung) => {

                  /* ════════ Buchungen Mappen ════════ */
                  return (
                    <div className="buchungenBox" key={buchung.id}>
                      <div >
                        <img src={buchung.foto1} alt={"Parkplatz aus " + buchung.adresse} />
                      </div>
                      <div className="pad8">

                        {/* ════════ Buchungs Details ════════ */}
                        <strong>Adresse: {buchung.adresse}</strong><br />
                        <span>Preis: {buchung.preis} € / Stunde</span><br />
                        <span>Am: {timeToDe(buchung.von, buchung.bis)}</span>

                        <div className="center">

                          {/* ════════ Button Kontaktieren ════════ */}
                          <Button color="secondary" variant="contained"
                            onClick={() => {
                              navigate(`/nachrichten/${buchung.vermieter}/${buchung.parkplatz}`)
                            }}>Kontaktieren</Button>

                        </div>
                      </div>
                    </div>
                  )
                })}
            </>
        }

      </main>

      <AppFooter aktiv={3} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Buchungen);
