import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'

// MUI
import { Button } from '@mui/material'

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║           function NotFound (Seite)       ║
╚═══════════════════════════════════════════╝
*/
function NotFound(props) {

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Unbekannte Seite" back={() => { navigate("/") }} menu={true} />

      <main id='main'>

        <h1>Seite wurde nicht gefunden.</h1>

        <br />

        <h2>Suchst du einen Parkplatz?</h2>

        {/* ════════ Button Parkplatz suchen ════════ */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained" onClick={() => { navigate("/suche") }}>Parkplatz suchen</Button>
        </div>

        <h2>Möchtest du einen Parkplatz anbieten?</h2>

        {/* ════════ Button Parkplatz anbieten ════════ */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained" onClick={() => { navigate("/anbieten") }}>Parkplatz anbieten</Button>
        </div>

      </main>

      <AppFooter />
    </div>
  );
}

export default connect(mapStateToProps)(NotFound);