import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import {
  Button, TextField, IconButton, FilledInput, InputLabel,
  InputAdornment, FormControl, FormControlLabel, Checkbox
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Components
import AppHeader from '../components/AppHeader';

/*
╔═══════════════════════════════════════════╗
║        function Registrieren (Seite)      ║
╚═══════════════════════════════════════════╝
*/
function Registrieren(props) {

  /* ════════ States Registrieren Formular ════════ */

  /* ════════ Passwort Anzeigen ════════ */
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => { e.preventDefault(); };

  /* ════════ Registrieren Formular ════════ */
  const [regForm, setRegForm] = useState({
    vorname: "",
    nachname: "",
    email: "",
    passwort: "",
    passwortCheck: "",
    agbAkzeptiert: false,
  })

  /* ════════ Änderung des Formulars an State Übergeben ════════ */
  function regFormChange(e) {
    setRegForm((currentState) => {
      return {
        ...currentState,
        [e.target.name]: e.target.type === 'checkbox' ?
          e.target.checked :
          e.target.value
      }
    })
  }

  /* ════════ Function zum überprüfen einer gültigen Email Adresse ════════ */
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Registrieren" back={() => { navigate("/") }} menu={true} />

      <main id='main'>
        <h1>Herzlich Willkommen!</h1>
        <h2>Bevor es losgehen kann,<br />lege bitte ein Benutzerkonto an.</h2>
        <p>Dies ist notwendig, damit du deine Buchungen später verwalten kannst.</p>

        <div>

          {/* ════════ Eingabefeld Vorname ════════ */}
          <TextField name="vorname" label="Vorname" required variant="filled" fullWidth margin="normal"
            error={regForm.vorname === "" && regForm.agbAkzeptiert ? true : false}
            onChange={regFormChange} />


          {/* ════════ Eingabefeld Nachname ════════ */}
          <TextField name="nachname" label="Nachname" required variant="filled" fullWidth margin="normal"
            error={regForm.nachname === "" && regForm.agbAkzeptiert ? true : false}
            onChange={regFormChange} />


          {/* ════════ Eingabefeld E-Mail ════════ */}
          <TextField name="email" required variant="filled" fullWidth margin="normal"
            label={!validateEmail(regForm.email) && regForm.email.length !== 0 ? "E-Mail-Adresse (Ungültiges Format)" : "E-Mail-Adresse"}
            error={!validateEmail(regForm.email) && regForm.agbAkzeptiert ? true : false}
            onChange={regFormChange} />


          {/* ════════ Eingabefeld Passwort ════════ */}
          <FormControl variant="filled" fullWidth required margin="normal" >
            <InputLabel htmlFor="filled-adornment-password"
              error={regForm.passwort.length < 8 && regForm.agbAkzeptiert ? true : false}>
              Passwort
              {regForm.passwort.length < 8 && " (min. 8 Zeichen)"}
            </InputLabel>

            <FilledInput name="passwort" onChange={regFormChange}
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


          {/* ════════ Eingabefeld Passwort wiederholen ════════ */}
          <FormControl variant="filled" fullWidth required margin="normal" >
            <InputLabel htmlFor="filled-adornment-password2"
              error={regForm.passwort !== regForm.passwortCheck ? true : false} >
              Passwort wiederholen
              {regForm.passwort !== regForm.passwortCheck && regForm.passwortCheck !== "" && " (nicht identisch)"}
            </InputLabel>

            <FilledInput name="passwortCheck" onChange={regFormChange}
              id="filled-adornment-password2"
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


        {/* ════════ Checkbox Ich akzeptiere die AGBs ════════ */}
        <FormControlLabel name="agbAkzeptiert" onChange={regFormChange}
          required control={<Checkbox sx={{
            color: "#70bfbe",
            '&.Mui-checked': {
              color: "#70bfbe",
            },
          }} />} label="Ich akzeptiere die AGBs" />

        <br />


        {/* ════════ Button Registrieren ════════ */}
        <div className="center buttonBox">
          <Button variant="contained" color="hightlight"
            disabled={
              regForm.vorname === "" ||
              regForm.nachname === "" ||
              !validateEmail(regForm.email) ||
              regForm.passwort.length < 8 ||
              regForm.passwort !== regForm.passwortCheck ||
              regForm.agbAkzeptiert === false
            }
            onClick={() => {
              props.addUser(regForm, () => { navigate("/profil") }, () => { alert("Email-Adresse bereits Registriert") })
            }}>Registrieren</Button>
        </div>

      </main>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Registrieren);