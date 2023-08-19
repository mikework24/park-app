import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// MUI
import { Button } from '@mui/material'

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║    function FahrzeugHinzugefuegt (Seite)  ║
╚═══════════════════════════════════════════╝
*/
function FahrzeugHinzugefuegt(props) {

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
    
    setFahrzeugB(require(`../img/${fahrzeugTypen[props.fahrzeug[0].typ][1]}.svg`))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Fahrzeug Hinzugefügt" back={() => { navigate("/") }} menu={true} />

      <main id='main'>

        <h1>Los geht's!</h1>

        <p>Dein Fahrzeug wurde erfolgreich hinzugefügt.</p>

        <br />

        <div className="center">
          <img height="70px" src={fahrzeugB} alt="Auto" />

          <div className="nummernschild">{props.fahrzeug[0].nummernschild}</div>
        </div>

        {/* ════════ Button Parkplatz suchen ════════ */}
        <div className="center buttonBox">
          <Button color="hightlight" variant="contained" onClick={() => { navigate("/suche") }}>Parkplatz suchen</Button>
        </div>

      </main>

      <AppFooter />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FahrzeugHinzugefuegt);