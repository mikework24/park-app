import { useEffect } from 'react'

//Router
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

//UI
import { FormControlLabel, Switch } from '@mui/material'

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔════════════════════════════════════════════╗
║ function ParkplatzVeroeffentlichen (Seite) ║
╚════════════════════════════════════════════╝
*/
function ParkplatzVeroeffentlichen(props) {

  /* ════════ Lade alle Objekte des Users nach erfolgreichem laden ════════ */
  useEffect(() => {
    if (props.user.id) {
      props.parkplatzMeine(props.user.id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user])

  /* ════════ Speichern bei veränderung ════════ */
  function parkplatzChange(parkplatz) {
    /* ════════ Kopie erstellen, !aktiv, id löschen ════════ */
    let new_parkplatz = { ...parkplatz }
    new_parkplatz.aktiv = !new_parkplatz.aktiv
    delete new_parkplatz.id;

    /* ════════ Objekt an Datenbank schicken und mit put ersetzen ════════ */
    props.parkplatzAendern(parkplatz.id, new_parkplatz)
  }

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Parkplatz Veröffentlichen" back={() => { navigate("/") }} menu={true} />

      <main id='main'>

        <div >
          <p>Veröffentlichen Sie Ihre Parkplätze, damit andere Nutzer Ihren Parkplatz Buchen können.</p>
        </div>

        {
          /* ════════ Eigene Parkplätze Auflisten und per Switch Veröffentlichen lassen ════════ */
          props.parkplatz.map((value, index) => {
            return (
              <p>
                <FormControlLabel label={value.name}
                  control={<Switch name="parkplatzMehr" color="secondary"
                    checked={value.aktiv}
                    onChange={() => { parkplatzChange(value) }} />} />
              </p>
            )

          })
        }

      </main >

      <AppFooter />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkplatzVeroeffentlichen);