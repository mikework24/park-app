import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

//MUI
import { Button, TextField, MenuItem, FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

//Date & Time Picker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

/*
╔═══════════════════════════════════════════╗
║           function Suche (Seite)          ║
╚═══════════════════════════════════════════╝
*/
function Suche(props) {

  const navigate = useNavigate()

  /* ════════ voreingestellte werte ════════ */
  const now = new Date();
  const startZeit = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0).getTime();
  const endZeit = startZeit + 7200000;

  /* ════════ voreingestellte werte an DB übergeben ════════ */
  useEffect(() => {
    if (props.user.id) {
      props.fahrzeugMeine(props.user.id)
    }

    if (props.suche.ab === "") {
      props.sucheingabe({ name: "ab", value: startZeit })
    }
    if (props.suche.bis === "") {
      props.sucheingabe({ name: "bis", value: endZeit })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ════════ Dropdown Inhalt -> Muß noch von DB geladen werden ════════ */
  const fahrzeugSelect = [
    {
      value: '2',
      label: 'Pasat',
    }
  ];

  return (
    <div className="App">
      <AppHeader titel="Parkplatz Suche" back={() => { navigate("/") }} menu={true} />

      <main id='main'>
        {/*<h1>Suche</h1>*/}
        <div>

          {  /* ════════ Eingabefeld Orte, Adresse, PLZ ════════ */}
          <FormControl variant="filled" fullWidth required margin="normal" >
            <InputLabel htmlFor="filled-adress">
              Orte, Adresse, PLZ
            </InputLabel>

            <FilledInput id="filled-adress" type="text"
              name="ort"
              onChange={(e) => { props.sucheingabe({ name: e.target.name, value: e.target.value }) }}
              value={props.suche.ort}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton

                    onClick={() => { }}
                    onMouseDown={() => { }}
                    edge="start"
                  >
                    <GpsFixedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                'MobileDateTimePicker',
              ]}
            >

              {  /* ════════ Eingabefeld ab Uhrzeit ════════ */}
              <MobileDateTimePicker slotProps={{ textField: { variant: 'filled' } }} ampm={false}
                label="Parken ab"
                name="ab"
                defaultValue={dayjs(props.suche.ab ? props.suche.ab : startZeit)}
                onChange={(date) => { props.sucheingabe({ name: "ab", value: date.$d }) }} />


              {  /* ════════ Eingabefeld bis Uhrzeit ════════ */}
              <MobileDateTimePicker slotProps={{ textField: { variant: 'filled' } }} ampm={false}
                label="Parken bis"
                name="bis"
                defaultValue={dayjs(props.suche.bis ? props.suche.bis : endZeit)}
                onChange={(date) => { props.sucheingabe({ name: "bis", value: date.$d }) }} />

            </DemoContainer>
          </LocalizationProvider>
        </div>

        <br />

        {  /* ════════ Eingabefeld Fahrzeug ════════ */}
        <div className="text">
          <TextField select variant="filled" fullWidth
            label="Fahrzeug"
            name="fahrzeugTyp"
            value={props.fahrzeug.length === 0 ? "0" : props.fahrzeug[0].id}
            onChange={(e) => { props.sucheingabe({ name: e.target.name, value: e.target.value }) }} >

            {
              props.fahrzeug.map((value) => {
                return (
                  <MenuItem key={value.id} value={value.id}>
                    {value.name}
                  </MenuItem>
                )
              })
            }

            {
              props.fahrzeug.length === 0 &&
              <MenuItem key="0" value="0">
                Pasat(Dummy)
              </MenuItem>
            }

          </TextField>
        </div>


        {  /* ════════ Button Suche ════════ */}
        <div className="center buttonBox">
          <Button color="hightlight" variant="contained"
            disabled={props.suche.ort === ""}
            onClick={() => { props.parkplatzSuche(props.suche, () => { navigate("/suchergebnisse") }) }}
          >Suche</Button>
        </div>

      </main>

      <AppFooter aktiv={1} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Suche);
