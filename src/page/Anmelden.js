import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps'

// MUI
import { Button, TextField, IconButton, FilledInput, InputLabel, InputAdornment, FormControl } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Components
import AppHeader from '../components/AppHeader';

/*
╔═══════════════════════════════════════════╗
║          function Anmelden (Seite)        ║
╚═══════════════════════════════════════════╝
*/
function Anmelden(props) {

  /* ════════  States ════════ */
  /* ════════ Passwort anzeigen ═══════ */
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => { e.preventDefault(); };

  /* ════════ Anmelden Formular ═══════ */
  const [anForm, setAnForm] = useState({
    email: "",
    passwort: ""
  })

  /* ════════ Formular State Aktuallisieren ═══════ */
  function anFormChange(e) {
    setAnForm((currentState) => {
      return {
        ...currentState,
        [e.target.name]: e.target.type === 'checkbox' ?
          e.target.checked :
          e.target.value
      }
    })
  }

  /* ════════ Email Adresse Validieren ═══════ */
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Anmelden" back={() => { navigate("/") }} menu={true} />

      <main id='main'>
        <h1>Willkommen zurück!</h1>
        <p>Beim Privaten Parkplatz Sharing.</p>

        <div>
          {/*
          ╔═══════════════════════════════════════════╗
          ║               E-Mail-Adresse              ║
          ╚═══════════════════════════════════════════╝
          */}
          <TextField name="email" required variant="filled" fullWidth margin="normal"
            label={!validateEmail(anForm.email) && anForm.email.length !== 0 ? "E-Mail-Adresse (Ungültiges Format)" : "E-Mail-Adresse"}
            error={!validateEmail(anForm.email) && anForm.email.length !== 0 ? true : false}
            onChange={anFormChange} />

          {/*
          ╔═══════════════════════════════════════════╗
          ║                   Passwort                ║
          ╚═══════════════════════════════════════════╝
          */}
          <FormControl variant="filled" fullWidth required margin="normal" >
            <InputLabel htmlFor="filled-adornment-password"
              error={anForm.passwort.length < 8 && anForm.passwort.length > 0 ? true : false}>
              Passwort
              {anForm.passwort.length < 8 && " (min. 8 Zeichen)"}
            </InputLabel>

            <FilledInput name="passwort" onChange={anFormChange}
              id="filled-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

        </div>

        <br />

        {/*
        ╔═══════════════════════════════════════════╗
        ║               Anmelden Button             ║
        ╚═══════════════════════════════════════════╝
        */}
        <div className="center buttonBox">
          <Button color="hightlight" variant="contained"
            disabled={
              !validateEmail(anForm.email) ||
              anForm.passwort.length < 8
            }
            onClick={() => {
              props.loginUser(
                anForm,
                () => { navigate("/") },
                () => { alert("Nutzerdaten Stimmen nicht!") })
            }
            }>Anmelden</Button>
        </div>

        <br />

        <p>Ich habe mein Passwort vergessen.</p>

        {/*
        ╔═══════════════════════════════════════════╗
        ║       Passwort Zurücksetzen Button        ║
        ╚═══════════════════════════════════════════╝
        */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained" onClick={() => { navigate("/passwort-zuruecksetzen") }}>Passwort Zurücksetzen</Button>
        </div>

      </main >
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Anmelden);