import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import { Button, TextField } from '@mui/material'

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import NachrichtBox from '../components/NachrichtBox';

/*
╔═══════════════════════════════════════════╗
║       function Nachrichten (Seite)        ║
╚═══════════════════════════════════════════╝
*/
function Nachrichten(props) {

  /* ════════ Aktuelles Datum ════════ */
  const now = new Date().valueOf()

  /* ════════ Parameterübergabe ════════ */
  const PARAMS = useParams()

  /* ════════  States ════════ */
  /* ════════ Formular Felder ═══════ */
  const [nachrichtForm, setNachrichtForm] = useState({
    titel: "",
    parkplatz: PARAMS.parkplatz,
    mieter: props.user.id,
    vermieter: PARAMS.user,
    nachricht: ""
  })

  /* ════════ Bei veränderung State Aktuallisieren ═══════ */
  function nachrichtChange(e) {
    setNachrichtForm((currentState) => {
      return {
        ...currentState,
        [e.target.name]: e.target.value
      }
    })
  }

  /* ════════ Wird beim Klick auf dem Button Senden ausgeführt ═══════ */
  function nachrichtSenden() {

    const now = new Date().valueOf()

    /* ════════ Datenbank Objekt wird erstellt ═══════ */
    const nachticht = {
      vermieterName: props.usernameFromId,
      titel: nachrichtForm.titel,
      parkplatz: nachrichtForm.parkplatz,
      mieter: nachrichtForm.mieter,
      vermieter: nachrichtForm.vermieter,
      users: 'X' + nachrichtForm.mieter + 'X' + nachrichtForm.vermieter + 'X',
      nachricht: [
        {
          von: props.user.id,
          zeit: now,
          text: nachrichtForm.nachricht
        }
      ]
    }

    /* ════════ Nachricht wird in die DB geschireben, anschließend wird die Seite Nachrichten geladen ═══════ */
    props.nachrichtenNeue(props.user.id, 
      nachticht,
      () => {
        navigate("/nachrichten")
      }
    )

  }

  /* ════════ Nachladen von benötigen daten ═══════ */
  useEffect(() => {
    if (PARAMS.user) {
      /* ════════ Beim Schreiben einer Nachricht wird der Empfängername geladen ═══════ */
      props.usernameById(PARAMS.user)
    } else {
      /* ════════ Bei meinen Nachrichten werden alle meine Nachrichten geladen ═══════ */
      props.nachrichtenMeine(props.user.id)
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  /* ════════ Standard Nachricht des Supports wird erstellt ═══════ */
  const support = {
    vermieterName: "Support Team",
    titel: "",
    parkplatz: 0,
    mieter: props.user,
    vermieter: 0,
    erledigt: false,
    melden: false,
    nachricht: [
      {
        von: 0,
        zeit: now,
        text: "Herzlich Willkommen beim privaten Parkplatz Sharing! Bei fragen und Problemen können Sie uns hier im Nachrichten Bereich kontaktieren. Ihr Support Team"
      }
    ]
  }

  return (
    <div className="App">
      <AppHeader titel="Nachrichten" back={() => { navigate("/") }} menu={true} />

      <main id='main'>

        {PARAMS.user && PARAMS.parkplatz ?
          <>
            {/* ════════ Seiteninhalt: beim Schreiben einer neuen Nachricht ════════ */}
            <div className="nachrichtBox">

              <div className="head">
                <div className="titel">
                  <p>Nachricht an: {props.usernameFromId}</p>
                </div>
              </div>

              <div>
                <TextField required variant="filled" fullWidth margin="normal"
                  name="titel"
                  label="Titel"
                  defaultValue={nachrichtForm.titel}
                  onChange={nachrichtChange} />
              </div>

              <div>
                <TextField required multiline fullWidth variant="filled" rows={4} margin="normal"
                  label="Nachricht"
                  name="nachricht"
                  defaultValue={nachrichtForm.nachricht}
                  onChange={nachrichtChange}
                />
              </div>

              <div className="center buttonBox">
                <Button color="hightlight" variant="contained"
                  disabled={nachrichtForm.titel === "" || nachrichtForm.nachricht === ""}
                  onClick={nachrichtSenden}
                >Senden</Button>
              </div>
            </div >
          </>
          :
          <>
            {/* ════════ Seiteninhalt: Auflisten der eigenen Nachrichen  ════════ */}
            {props.nachrichten.map((nachricht) => {

              /* ════════ Mappen eigener Nachrichten ════════ */
              return (
                <NachrichtBox inhalt={nachricht} user={props.user} key={nachricht.id} />
              )
            })}

            {/* ════════ Support Nachricht ════════ */}
            <NachrichtBox inhalt={support} user={props.user} key="0" />
          </>
        }

      </main>

      <AppFooter aktiv={4} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Nachrichten);
