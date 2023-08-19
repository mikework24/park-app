import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║           function Info (Seite)           ║
╚═══════════════════════════════════════════╝
*/
function Info(props) {

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Info" back={() => { navigate("/") }} menu={true} />

      <main id='main'>

        <h1>Infos</h1>

        <p>
          Platzhalter
        </p>

        <br />
        <br />
        <br />
        <br />
        <br />

        <h2>Rechliches</h2>

        <p>
          Platzhalter
        </p>

      </main>

      { props.user?.email && <AppFooter /> }
      
    </div>
  );
}

export default connect(mapStateToProps)(Info);