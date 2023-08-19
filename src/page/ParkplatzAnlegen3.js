import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import { Button, TextField, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║      function ParkplatzAnlegen (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function ParkplatzAnlegen3(props) {

  /* ════════ Bild hinzufügen (Wird ausgeführt beim klicken aufs erste BIld) ════════ */
  function bildSpeichern(name, bild) {
    props.parkplatzForm({ target: { name: name, value: bild } })
  }

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Parkplatz Anlegen" back={() => { navigate("/parkplatz-anlegen2") }} menu={true} />

      <main id='main'>

        {/* ════════ Fortschitts Anzeige des Neuen Parkplatzes ════════ */}
        <div className="center">
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 1" onClick={() => { navigate("/parkplatz-anlegen") }} />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 2" onClick={() => { navigate("/parkplatz-anlegen2") }} />
          <img src={require('../img/punktG.svg').default} alt="Abschnitt 3" />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 4" />
        </div>

        <h1>Fotos</h1>

        <p>Mind. ein Foto, max. 4 Fotos einfügen</p>

        {/* ════════ Bild Boxen ════════ */}
        <div className="flexBox">
          <div className="center flexCenter mHeight90">
            {
              props.parkplatzNeu.foto1 === "" ?

                /* ════════ Plus Button ════════ */
                <Fab color="primary" aria-label="edit" size="medium" className="noneShadow bigIcon"
                  onClick={() => { bildSpeichern("foto1", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRolDnQRYcWZ_HJ1zxuy9NuN31_ZtBqgAmS8A&usqp=CAU") }}>
                  <AddIcon />
                </Fab>
                :

                /* ════════ Bild nach klicken auf den Plus Button ════════ */
                <img src={require('../img/autoB.svg').default} alt="Auto" />
            }
          </div>

          <div className="center flexCenter mHeight90">
            <Fab color="primary" aria-label="edit" size="medium" className="noneShadow bigIcon" onClick={() => { navigate("/parkplatz-anlegen3") }}>
              <AddIcon />
            </Fab>
          </div>
        </div>

        <div className="flexBox">
          <div className="center flexCenter mHeight90">
            <Fab color="primary" aria-label="edit" size="medium" className="noneShadow bigIcon" onClick={() => { navigate("/parkplatz-anlegen3") }}>
              <AddIcon />
            </Fab>
          </div>

          <div className="center flexCenter mHeight90">
            <Fab color="primary" aria-label="edit" size="medium" className="noneShadow bigIcon" onClick={() => { navigate("/parkplatz-anlegen3") }}>
              <AddIcon />
            </Fab>
          </div>
        </div>

        <h2>Beschreibung</h2>

        <p className='font14'>z.B. eine besondere Wegebeschreibung oder wie öffnet sich das Tor, etc. (Optional)</p>

        {/* ════════ Eingabefeld Beschreibung ════════ */}
        <div>
          <TextField multiline fullWidth variant="filled" rows={4}
            label="Beschreibung max. 200 Zeichen"
            name="beschreibung"
            defaultValue={props.parkplatzNeu.beschreibung}
            onChange={props.parkplatzForm}
          />
        </div>

        {/* ════════ Button Übernehmen ════════ */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained"
            disabled={props.parkplatzNeu.foto1 === "" ? true : undefined}
            onClick={() => { navigate("/parkplatz-anlegen4") }}>Übernehmen</Button>
        </div>

      </main >

      <AppFooter aktiv={2} />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkplatzAnlegen3);