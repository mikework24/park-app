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
║      function ParkplatzAnlegen (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function WillkommenUser(props) {

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Willkommen" back={false} menu={true} />

      <main id='main'>
        <h1>Hallo {props.user.vorname}!</h1>
        <h2>Schön, dass du da bist.</h2>
        <p>Beim deinem Privaten Parkplatz Sharing.</p>
        <br />

        {/* ════════ IMG Parkplatz Sharing ════════ */}
        <div className="bgPrimary center pad30">
          <img src={require('../img/sharing.svg').default} alt="Parkplatz Sharing" />
        </div>

        <br />

        {/* ════════ Button Parkplatz suchen ════════ */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained" onClick={() => { navigate("/suche") }}>Parkplatz suchen</Button>
        </div>

      </main>

      <AppFooter />
    </div>
  );
}

export default connect(mapStateToProps)(WillkommenUser);
