import { useEffect } from 'react'

// Routing
import { Routes, Route } from "react-router-dom";

// Redux
import { connect } from 'react-redux'
import mapStateToProps from './redux/mapStateToProps'
import mapDispatchToProps from './redux/mapDispatchToProps';

// Pages
import Willkommen from './page/Willkommen';
import Anmelden from './page/Anmelden';
import Registrieren from './page/Registrieren';
import PasswortZurueck from './page/PasswortZurueck';
import Profil from './page/Profil';
import FahrzeugDaten from "./page/FahrzeugDaten";
import FahrzeugDaten2 from "./page/FahrzeugDaten2";
import FahrzeugDaten3 from "./page/FahrzeugDaten3";
import FahrzeugDatenVorschau from "./page/FahrzeugDatenVorschau";
import FahrzeugHinzugefuegt from "./page/FahrzeugHinzugefuegt";
import Suche from "./page/Suche";
import Anbieten from "./page/Anbieten";
import Buchungen from "./page/Buchungen";
import Nachrichten from "./page/Nachrichten";
import NotFound from "./page/NotFound";
import WillkommenUser from "./page/WillkommenUser";
import ParkplatzAnlegen from './page/ParkplatzAnlegen';
import ParkplatzAnlegen2 from './page/ParkplatzAnlegen2';
import ParkplatzAnlegen3 from './page/ParkplatzAnlegen3';
import ParkplatzVorschau from './page/ParkplatzVorschau';
import ParkplatzAnlegen4 from './page/ParkplatzAnlegen4';
import Suchergebnisse from './page/Suchergebnisse';
import ParkplatzDetails from './page/ParkplatzDetails';
import Info from './page/Info';

function App(props) {

  /*
  Einmalig beim start:
    LocalStorage:
    - login 
    Server:
    - user
    - buchungen
    - nachrichten
  */
  useEffect(() => {

    // Load LocalStorage login
    const loginString = localStorage.getItem("login")
    if (loginString != null) {
      const loginObjekt = JSON.parse(loginString)
      props.loadLoginLS(loginObjekt)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Lade alle Objekte des Users nach erfolgreichem laden
    if (props.user.id) {
      //props.parkplatzMeine(props.user.id)
    }
  }, [props.user])

  return (
    <Routes>
      {
        !props.user?.email ?
          <>
            {/* Gast -> Wilkommen, Anmelden, Registrieren */}
            <Route path="/" exact element={<Willkommen />} />
            <Route path="/anmelden" element={<Anmelden />} />
            <Route path="/registrieren" element={<Registrieren />} />
            <Route path="/passwort-zuruecksetzen" element={<PasswortZurueck />} />
          </>
          :
          <>
            {/* Willkommen User */}
            <Route path="/" exact element={<WillkommenUser />} />
            <Route path="/profil" element={<Profil />} />

            {/* Fahrzeug hinzufügen */}
            <Route path="/fahrzeug-daten" element={<FahrzeugDaten />} />
            <Route path="/fahrzeug-daten2" element={<FahrzeugDaten2 />} />
            <Route path="/fahrzeug-daten3" element={<FahrzeugDaten3 />} />
            <Route path="/fahrzeug-daten-vorschau" element={<FahrzeugDatenVorschau />} />
            <Route path="/fahrzeug-hinzugefuegt" element={<FahrzeugHinzugefuegt />} />

            {/* Parkplatz suchen */}
            <Route path="/suche" element={<Suche />} />
            <Route path="/suchergebnisse" element={<Suchergebnisse />} />
            <Route path="/parkplatz-details/:id" element={<ParkplatzDetails />} />

            {/* Parkplatz anbieten */}
            <Route path="/anbieten" element={<Anbieten />} />
            <Route path="/parkplatz-anlegen" element={<ParkplatzAnlegen />} />
            <Route path="/parkplatz-anlegen2" element={<ParkplatzAnlegen2 />} />
            <Route path="/parkplatz-anlegen3" element={<ParkplatzAnlegen3 />} />
            <Route path="/parkplatz-anlegen4" element={<ParkplatzAnlegen4 />} />
            <Route path="/parkplatz-vorschau" element={<ParkplatzVorschau />} />

            <Route path="/buchungen" element={<Buchungen />} />

            <Route path="/nachrichten" element={<Nachrichten />} />
            <Route path="/nachrichten/:user/:parkplatz" element={<Nachrichten />} />
          </>
      }

      <Route path="/info" element={<Info />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);