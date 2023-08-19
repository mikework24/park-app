import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import { Switch, Button, Checkbox, FormGroup, FormControlLabel } from '@mui/material'

//Date & Time Picker
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

/*
╔═══════════════════════════════════════════╗
║      function ParkplatzAnlegen (Seite)    ║
╚═══════════════════════════════════════════╝
*/
function ParkplatzAnlegen4(props) {


  /* ════════ Speichern bei veränderung ════════ */
  function parkplatzFormByKey(key, value) {
    props.parkplatzForm({ target: { name: key, value: value } })
  }

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Parkplatz Anlegen" back={() => { navigate("/parkplatz-anlegen3") }} menu={true} />

      <main id='main'>

        {/* ════════ Fortschitts Anzeige des Neuen Parkplatzes ════════ */}
        <div className="center">
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 1" onClick={() => { navigate("/parkplatz-anlegen") }} />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 2" onClick={() => { navigate("/parkplatz-anlegen2") }} />
          <img src={require('../img/punktW.svg').default} alt="Abschnitt 3" onClick={() => { navigate("/parkplatz-anlegen3") }} />
          <img src={require('../img/punktG.svg').default} alt="Abschnitt 4" />
        </div>

        <h1>Verfügbarkeit</h1>

        <p>Wann und wie lange willst du deinen Parkplatz vermieten?</p>

        <h2>Uhrzeit</h2>

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                'MobileDateTimePicker',
              ]}
            >

              {/* ════════ Eingabefeld ab Uhrzeit ════════ */}
              <MobileTimePicker slotProps={{ textField: { variant: 'filled' } }} ampm={false}
                name="uhrzeitAb"
                label="Parken ab (Uhr)"
                value={dayjs('2023-01-01T' + (props.parkplatzNeu.uhrzeitAb !== "" ? props.parkplatzNeu.uhrzeitAb : "8:00"))}
                onChange={(time) => { parkplatzFormByKey("uhrzeitAb", `${time.$H}:${time.$m}`) }} />


              {/* ════════ Eingabefeld bis Uhrzeit ════════ */}
              <MobileTimePicker slotProps={{ textField: { variant: 'filled' } }} ampm={false}
                name="uhrzeitBis"
                label="Parken bis (Uhr)"
                value={dayjs('2023-01-01T' + (props.parkplatzNeu.uhrzeitBis !== "" ? props.parkplatzNeu.uhrzeitBis : "17:00"))}
                onChange={(time) => { parkplatzFormByKey("uhrzeitBis", `${time.$H}:${time.$m}`) }} />
              {/*onChange={(newValue) => setValue(newValue)} />*/}

            </DemoContainer>
          </LocalizationProvider>
        </div>

        <h2>Wochentage</h2>

        {/* ════════ Checkbox Wochentage ════════ */}
        <FormGroup>

          <FormControlLabel name="montag" label="Montag"
            onChange={props.parkplatzForm} checked={props.parkplatzNeu.montag} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

          <FormControlLabel name="dienstag" label="Dienstag"
            onChange={props.parkplatzForm} checked={props.parkplatzNeu.dienstag} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

          <FormControlLabel name="mittwoch" label="Mittwoch"
            onChange={props.parkplatzForm} checked={props.parkplatzNeu.mittwoch} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

          <FormControlLabel name="donnerstag" label="Donnerstag"
            onChange={props.parkplatzForm} checked={props.parkplatzNeu.donnerstag} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

          <FormControlLabel name="freitag" label="Freitag"
            onChange={props.parkplatzForm} checked={props.parkplatzNeu.freitag} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

          <FormControlLabel name="samstag" label="Samstag"
            onChange={props.parkplatzForm} checked={props.parkplatzNeu.samstag} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

          <FormControlLabel name="sonntag" label="Sonntag"
            onChange={props.parkplatzForm} checked={props.parkplatzNeu.sonntag} control={<Checkbox sx={{ color: "#70bfbe", '&.Mui-checked': { color: "#70bfbe", } }} />} />

        </FormGroup>

        <h2>Zeitraum</h2>

        {/* ════════ Switch Zeitraum festlegen ════════ */}
        <p>
          <FormControlLabel label="Zeitraum festlegen"
            control={<Switch name="datumFestlegen" color="secondary"
              defaultValue={props.parkplatzNeu.datumFestlegen}
              checked={props.parkplatzNeu.datumFestlegen}
              onChange={props.parkplatzForm} />} />
        </p>

        <p className='font14'>Aktivierter Zeitraum grenzt die verfügbarkeit ein.</p>

        {
          props.parkplatzNeu.datumFestlegen &&
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'MobileDateTimePicker',
                ]}
              >

                {/* ════════ Eingabefeld ab Datum ════════ */}
                <MobileDatePicker slotProps={{ textField: { variant: 'filled' } }}
                  name="datumAb"
                  label="Parken ab dem (Datum)"
                  defaultValue={dayjs(props.parkplatzNeu.datumAb)}
                  onChange={(time) => { parkplatzFormByKey("datumAb", `${time.$y}-${time.$M}-${time.$D}`) }} />


                {/* ════════ Eingabefeld bis Datum ════════ */}
                <MobileDatePicker slotProps={{ textField: { variant: 'filled' } }}
                  name="datumBis"
                  label="Parken bis zum (Datum)"
                  defaultValue={dayjs(props.parkplatzNeu.datumBis)}
                  onChange={(time) => { parkplatzFormByKey("datumBis", `${time.$y}-${time.$M}-${time.$D}`) }} />

              </DemoContainer>
            </LocalizationProvider>
          </div>
        }

        {/* ════════ Button Vorschau ════════ */}
        <div className="center buttonBox">
          <Button color="secondary" variant="contained"
            disabled={
              !(props.parkplatzNeu.montag ||
                props.parkplatzNeu.dienstag ||
                props.parkplatzNeu.mittwoch ||
                props.parkplatzNeu.donnerstag ||
                props.parkplatzNeu.freitag ||
                props.parkplatzNeu.samstag ||
                props.parkplatzNeu.sonntag)
            }
            onClick={() => { navigate("/parkplatz-vorschau") }}>Vorschau</Button>
        </div>

      </main >

      <AppFooter aktiv={2} />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkplatzAnlegen4);