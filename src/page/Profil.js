import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import { Button, RadioGroup, FormControlLabel, Radio } from '@mui/material'

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║      function ParkplatzAnlegen (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function Profil(props) {

  /* ════════ Lade alle Objekte des Users nach erfolgreichem laden ════════ */
  useEffect(() => {
    if (props.user.id) {
      props.parkplatzMeine(props.user.id)

      props.fahrzeugMeine(props.user.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Profil" back={() => { navigate("/") }} menu={true} />

      <main id='main'>
        <h1>Hallo {props.user.vorname}!</h1>
        <h2>Schön, dass du da bist.</h2>
        {props.user.fahrzeug?.name?.length === 0 && props.parkplatz.length === 0 &&
          <p>Dein Profil ist aktuell noch leer. Du kannst unter dem Menü 'Suche' bereits einen passenden Parkplatz für dich Suchen.</p>
        }

        <div className="bgPrimary padH20 marH20">
          {props.fahrzeug?.length === 0 ?
            <>
              <h3>Du suchst einen Parkplatz?</h3>
              <span>Dann gebe bitte deine Fahrzeugdaten ein.</span>


              {/* ════════ Button Fahrzeug eingeben ════════ */}
              <div className="center buttonBox">
                <Button color="secondary" variant="contained" onClick={() => { navigate("/fahrzeug-daten") }}>Fahrzeug hinzufügen</Button>
              </div>
            </>
            :
            <>
              <h3>Fahrzeugdaten ändern oder hinzufügen?</h3>

              <RadioGroup
                defaultValue="neu"
                name="fahrzeugBearbeiten"
                onClick={(e) => { props.fahrzeugBearbeiten(e.target.value) }}
              >
                <FormControlLabel value="neu" control={<Radio />} label="Neues Fahrzeug" />
                {
                  props.fahrzeug.map((value) => {
                    return <FormControlLabel key={value.id} value={value.id} control={<Radio />} label={value.name + " Bearbeiten"} />
                  })
                }
              </RadioGroup>

              {/* ════════ Button Fahrzeug ändern ════════ */}
              <div className="center buttonBox">
                <Button color="secondary" variant="contained" onClick={() => { navigate("/fahrzeug-daten") }}>{props.fahrzeugNeu == "neu" ? "Fahrzeug hinzufügen" : "Fahrzeug ändern"}</Button>
              </div>
            </>
          }
        </div>


        <div className="bgPrimary padH20 marH20">
          <h3>Du möchtest einen Parkplatz anbieten?</h3>
          <span>Dann gebe bitte deine Parkplatzdaten ein.</span>

          {/* ════════ Button Parkplatz anbieten ════════ */}
          <div className="center buttonBox">
            <Button color="secondary" variant="contained" onClick={() => { navigate("/parkplatz-anlegen") }}>Parkplatz anbieten</Button>
          </div>

          {
            props.parkplatz.length !== 0 &&
            <><span>Du bietes bereits {props.parkplatz.length}
              {props.parkplatz.length > 1 ?
                <> Parkplätze an.</> :
                <> Parkplatz an.</>}
            </span><br /></>
          }
        </div>

      </main>

      <AppFooter />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);