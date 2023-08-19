import { useState, useEffect } from 'react'

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
║   function FahrzeugDatenVorschau (Seite)  ║
╚═══════════════════════════════════════════╝
*/
function FahrzeugDatenVorschau(props) {

  /* ════════ States ════════ */

  /* ════════ Fahrzeug Bild Aktuallisieren ════════ */
  const [fahrzeugB, setFahrzeugB] = useState()

  /* ════════ Fahrzeug Typ & Bildname ════════ */
  const fahrzeugTypen = {
    "": ["", "fahrzeugM"],
    "-1": ["", "fahrzeugM"],
    "0": ["Kleinwagen", "fahrzeugK"],
    "1": ["Mittelklassewagen", "fahrzeugM"],
    "2": ["Kombi", "fahrzeugKombi"],
    "3": ["Van / SUV", "fahrzeugV"],
    "4": ["Kleinbus / Transporter", "fahrzeugT"],
    "5": ["Wohnmobil", "fahrzeugW"]
  }

  /* ════════ Bild nachladen ════════ */
  useEffect(() => {
    
    props.fahrzeugForm({
      target: {
        name: "userID",
        value: props.user.id
      }
    })
    
    setFahrzeugB(require(`../img/${fahrzeugTypen[props.fahrzeugNeu.typ][1]}.svg`))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Fahrzeug Vorschau" back={() => { navigate("/fahrzeug-daten3") }} menu={true} />

      <main id='main'>

        {/* ════════ Titel & bearbeiten Button ════════ */}
        <div className="flex-box">
          <h1>Alles richtig?</h1>

          <Fab color="secondary" size="medium" aria-label="edit" onClick={() => { navigate("/fahrzeug-daten") }}>
            <EditIcon />
          </Fab>
        </div>

        {/* ════════ Fahrzeug & Nummernschild ════════ */}
        <div className="flexBox">
          <div className="pad8 center">
            <strong>{props.fahrzeugNeu.name}</strong><br />

            <img height="70px" src={fahrzeugB} alt="Auto" />
          </div>
          <div className="pad8 center">
            <strong>Nummernschild</strong><br />
            <div className="nummernschild">{props.fahrzeugNeu.nummernschild}</div>
          </div>
        </div>

        {/* ════════ Bei genauen daten anzeigen ════════ */}
        {props.fahrzeugNeu.genau &&
          <>
            <div className="flexBox">

              {/* ════════ Fahrzeug Höhe ════════ */}
              <div className="center pad8">
                <img src={require('../img/autoH.svg').default} alt="Fahrzeug Höhe" />
                <span>Höhe: {props.fahrzeugNeu.hoehe} cm</span>
              </div>

              {/* ════════ Fahrzeug Breite ════════ */}
              <div className="center pad8">
                <img src={require('../img/autoB.svg').default} alt="Fahrzeug Breite" />
                <span>Breite: {props.fahrzeugNeu.breite} cm</span>
              </div>
            </div>

            <div className="flexBox">

              {/* ════════ Fahrzeug Länge ════════ */}
              <div className="center pad8">
                <img src={require('../img/autoL.svg').default} alt="Fahrzeug Länge" />
                <span>Länge: {props.fahrzeugNeu.laenge} cm</span>
              </div>

              {/* ════════ Fahrzeug Gewicht ════════ */}
              <div className="center pad8">
                <img src={require('../img/kg.svg').default} alt="Fahrzeug Gewicht" />
                <span>Gewicht: {props.fahrzeugNeu.kg} kg</span>
              </div>
            </div>
          </>
        }

        {/* ════════ Anzeigen wenn Barrierefreiheit oder Breiter Parkplatz ════════ */}
        {(props.fahrzeugNeu.barrierefrei === true || props.fahrzeugNeu.extraBreite === true) &&
          <>
            <h2>Besonderheiten</h2>

            <div className="flexBox">

              {/* ════════ Barrierefreiheit ════════ */}
              {props.fahrzeugNeu.barrierefrei === true &&
                <div className="center pad8">
                  <img src={require('../img/barrierefreiheit.svg').default} alt="Barrierefreiheit" />
                  <span>Barrierefreiheit</span>
                </div>
              }

              {/* ════════ Breiter Parkplatz ════════ */}
              {props.fahrzeugNeu.extraBreite === true &&
                <div className="center pad8">
                  <img src={require('../img/breiterParkplatz.svg').default} alt="Breiter Parkplatz" />
                  <span>Großer Parkplatz</span>
                </div>
              }

              {(props.fahrzeugNeu.barrierefrei === false || props.fahrzeugNeu.extraBreite === false) &&
                <div className="none">
                </div>
              }
            </div>
          </>
        }

        {/* ════════ Button Speichern ════════ */}
        <div className="center buttonBox">
          <Button color="hightlight" variant="contained"
            onClick={() => {
              props.fahrzeugHinzufuegen(
                props.fahrzeugNeu,
                () => { navigate("/fahrzeug-hinzugefuegt") }
              )
            }}>{ props.fahrzeugNeu.id != undefined || props.fahrzeugNeu.id != "" ? "Ändern" : "Speichern" }</Button>
        </div>

      </main >

      <AppFooter />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FahrzeugDatenVorschau);