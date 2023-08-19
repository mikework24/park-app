import { useEffect } from 'react'

//Router
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

//UI
import { FormControlLabel, Switch, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

// Components
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';


function Anbieten(props) {

  useEffect(() => {
    // Lade alle Objekte des Users nach erfolgreichem laden
    if (props.user.id) {
      props.parkplatzMeine(props.user.id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Speichern bei veränderung
  function parkplatzChange(parkplatz) {

    //Kopie erstellen, !aktiv, id löschen
    let new_parkplatz = { ...parkplatz }
    
    if(new_parkplatz.aktiv == 0){
      new_parkplatz.aktiv = 1;
    } else if(new_parkplatz.aktiv == 1) {
      new_parkplatz.aktiv = 0;
    }


    
    delete new_parkplatz.id;

    //Objekt an Datenbank schicken und mit put ersetzen
    props.parkplatzAendern(parkplatz.id, new_parkplatz)
  }

  const navigate = useNavigate()

  return (
    <div className="App">
      <AppHeader titel="Meine Parkplätze" back={() => { navigate("/") }} menu={true} />

      <main id='main'>

        <div >
          <p className='font14'>
            {
              props.parkplatz.length === 0 ?
                "Hier können Sie auch Ihren Parkplatz anbieten." :
                props.parkplatz.find((ele) => {return !ele.aktiv }) && "Veröffentlichen Sie Ihre Parkplätze, damit andere Nutzer Ihren Parkplatz Buchen können."
            }
          </p>
        </div>

        {
          props.parkplatz.map((value) => {
            return (
              <div className="fahrzeugListBox" key={value.id}>
                <div >
                  <img src={value.foto1} alt={"Parkplatz aus " + value.adresse} />
                </div>
                <div className="pad8">
                  <strong>{value.name}</strong><br />
                  <span>Adresse: {value.adresse}</span><br />
                  <FormControlLabel label="Veröffentlicht"
                    control={<Switch color="secondary"
                      checked={value.aktiv == 0?false:true}
                      onChange={() => { parkplatzChange(value) }} />} />
                </div>

              </div>
            )
          })
        }

        <div className="flexBox">
          <div className="center flexCenter mHeight90">
            <Fab color="primary" aria-label="edit" size="medium" className="noneShadow bigIcon" onClick={() => { navigate("/parkplatz-anlegen") }}>
              <AddIcon />
            </Fab>
          </div>
        </div>

      </main >

      <AppFooter aktiv={2} />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Anbieten);