import * as ACTIONS from './actionTypeStrings'
import axios from 'axios'
import { BASE_URL } from '../assets/BASE_URL'

// Functions
import md5 from '../functions/md5';

const mapDispatchToProps = (dispatch) => {

    return {
        //__________________________ USERS _________________________
        // Bei Start einmalig ausführen
        loadLoginLS: (userLS) => {
            dispatch(() => {
                // Nutzer Hash noch aktuell?
                axios.get(`${BASE_URL}/users?email=${userLS.email}&hash=${userLS.hash}`)
                    .then((res) => {

                        if (res.data.length !== 0) {

                            // Props
                            dispatch({
                                type: ACTIONS.SAVE_USER,
                                payload: res.data[0]
                            })
                            dispatch({
                                type: ACTIONS.SAVE_LOGIN,
                                payload: userLS
                            })

                        } else {
                            // daten veraltet -> Alle daten im Local Storage löschen
                            localStorage.clear();
                        }
                    })
                    .catch((res) => { console.log("error", res) })
            })
        },

        // Registrieren - Neuer User
        addUser: (newUser, weiter, fehler) => {
            dispatch(() => {
                // Nutzer bereits Registriert?
                axios.get(`${BASE_URL}/users?email=${newUser.email}`)
                    .then((res) => {

                        if (res.data.length === 0) {
                            //Email Verfügbar -> Eintragen in der DB des neuen Nutzers

                            let user = {
                                email: newUser.email,
                                vorname: newUser.vorname,
                                nachname: newUser.nachname,
                                passwort: md5(newUser.passwort),
                                hash: md5(Date.now() + newUser.email)
                            }

                            // Nutzerdaten werden der DB übergeben
                            axios.post(`${BASE_URL}/users`, user)
                                .then((res) => {

                                    //Speichert die user daten Lokal
                                    dispatch({
                                        type: ACTIONS.SAVE_USER,
                                        payload: res.data[0]
                                    })

                                    // Hinterlegt den letzen hash und belegt die anmeldung
                                    let login = {
                                        email: user.email,
                                        hash: user.hash
                                    }

                                    dispatch({
                                        type: ACTIONS.SAVE_LOGIN,
                                        payload: login
                                    })

                                    //Alle daten werden im Local Storage gespeichert
                                    localStorage.setItem("login", JSON.stringify(login))

                                    // Leitet den nutzer weiter
                                    weiter()

                                })
                        } else {

                            // Email bereits Verfügbar -> Nutzer kann sein Passwort wiederherstellen
                            fehler()
                        }
                    })
            })
        },

        // Anmelden
        loginUser: (userData, weiter, fehler) => {

            dispatch(() => {
                // Beim Server anfragen...
                axios.get(`${BASE_URL}/users?email=${userData.email}&passwort=${md5(userData.passwort)}`)
                    .then((res) => {
                        if (res.data.length !== 0) {
                            //nutzerdaten korrekt -> hash generieren und verbindungsdaten speichern

                            let user = {
                                ...res.data[0],
                                hash: md5(Date.now() + userData.email)
                            }

                            delete user.id;

                            // Nutzerdaten werden der DB übergeben
                            axios.put(`${BASE_URL}/users/${res.data[0].id}`, user)
                                .then((res2) => {

                                    user = res2.data[0]

                                    //Speichert die user daten Lokal
                                    dispatch({
                                        type: ACTIONS.SAVE_USER,
                                        payload: user
                                    })

                                    // Hinterlegt den letzen hash und belegt die anmeldung
                                    let login = {
                                        email: user.email,
                                        hash: user.hash
                                    }

                                    dispatch({
                                        type: ACTIONS.SAVE_LOGIN,
                                        payload: login
                                    })

                                    //Alle daten werden im Local Storage gespeichert
                                    localStorage.setItem("login", JSON.stringify(login))
                                    //localStorage.setItem("user", JSON.stringify(user))

                                    // Leitet den nutzer weiter
                                    weiter()
                                })

                        } else {
                            // daten veraltet -> Alle daten im Local Storage löschen
                            localStorage.clear();

                            fehler()
                        }
                    })
                    .catch((res) => { console.log("error", res) })
            })
        },


        //__________________________ Fahrzeug _________________________
        // Fahrzeug dem User hinzufügen ------------------------------------------
        fahrzeugHinzufuegen: (fahrzeugDaten, weiter) => {

            // Aktuelle Userdaten abrufen
            dispatch(() => {

                if (fahrzeugDaten.id == undefined || fahrzeugDaten.id == "") {

                    //Neues Fahrzeug Speichern
                    delete fahrzeugDaten.id;
                    axios.post(`${BASE_URL}/fahrzeug`, fahrzeugDaten)
                        .then((res) => {
                            // Props Aktuallisieren
                            dispatch({
                                type: ACTIONS.FAHRZEUG_HINZUFUEGEN,
                                payload: res.data[0]
                            })

                            dispatch({
                                type: ACTIONS.FAHRZEUG_NEU_LEEREN
                            })

                            weiter()
                        })
                        .catch((res) => { console.log("Fahrzeug hinzufügen Fehler: ", res) })

                } else {

                    //Vorhandenes Fahrzeug Überschreiben
                    axios.get(`${BASE_URL}/fahrzeug?id=${fahrzeugDaten.id}&userID=${fahrzeugDaten.userID}`)
                        .then((res) => {
                            if (res.data.length !== 0) {
                                //Fahrzeug Vorhanden und Inhaber ok

                                // Neue Fahrzeugdaten werden der DB übergeben
                                axios.put(`${BASE_URL}/fahrzeug/${fahrzeugDaten.id}`, fahrzeugDaten)
                                    .then((res2) => {

                                        //Alle fahrzeuge des nutzers neu laden
                                        dispatch({
                                            type: ACTIONS.FAHRZEUG_AENDERN,
                                            payload: res2.data[0]
                                        })

                                        dispatch({
                                            type: ACTIONS.FAHRZEUG_NEU_LEEREN
                                        })

                                        // Leitet den nutzer weiter
                                        weiter()
                                    })
                                    .catch((res2) => { console.log("Fahrzeug Ändern(put) Fehler: ", res2) })
                            }
                        })
                        .catch((res) => { console.log("Fahrzeug Ändern(get) Fehler: ", res) })

                }
            })
        },

        // Fahrzeug dem User hinzufügen ------------------------------------------
        fahrzeugMeine: (userID) => {
            dispatch(() => {
                // Lade alle Parkplätze des Nutzers
                axios.get(`${BASE_URL}/fahrzeug?userID=${userID}`)
                    .then((res) => {

                        dispatch({
                            type: ACTIONS.FAHRZEUG_MEINE,
                            payload: res.data
                        })
                    })
            })
        },

        // Eingabe Formular Fahrzeug
        fahrzeugForm: (daten) => {
            dispatch({
                type: ACTIONS.FAHRZEUG_NEU_EINGABE,
                payload: daten
            })
        },

        // Eingabe Formular Fahrzeug Bearbeiten
        fahrzeugBearbeiten: (fahrzeugID) => {
            dispatch({
                type: ACTIONS.FAHRZEUG_BEARBEITEN,
                payload: fahrzeugID
            })
        },

        //__________________________ Parkplatz _________________________
        // Parkplatz hinzufügen
        parkplatzHinzufuegen: (parkplatz, weiter) => {
            dispatch(() => {
                // Parkplatz an Datenbank senden
                axios.post(`${BASE_URL}/parkplatz`, parkplatz)
                    .then((res) => {
                        // Props Aktuallisieren
                        dispatch({
                            type: ACTIONS.PARKPLATZ_HINZUFUEGEN,
                            payload: res.data[0]
                        })

                        dispatch({
                            type: ACTIONS.PARKPLATZ_LEEREN
                        })

                        weiter()
                    })
                    .catch((res) => { console.log("Parkplatz hinzufügen Fehler: ", res) })
            })
        },

        // Parkplatz ändern
        parkplatzAendern: (id, parkplatz) => {
            dispatch(() => {
                // Parkplatz wird in der DB geändert
                axios.put(`${BASE_URL}/parkplatz/${id}`, parkplatz)
                    .then((res) => {

                        //Speichern der Props
                        dispatch({
                            type: ACTIONS.PARKPLATZ_AENDERN,
                            payload: res.data[0]
                        })
                    })
            })
        },

        // Ladet die eigenen Parkplätze
        parkplatzMeine: (userID) => {
            dispatch(() => {
                // Lade alle Parkplätze des Nutzers
                axios.get(`${BASE_URL}/parkplatz?userID=${userID}`)
                    .then((res) => {

                        dispatch({
                            type: ACTIONS.PARKPLATZ_MEINE,
                            payload: res.data
                        })
                    })
            })
        },

        // Wird in der Suchseite aufgerufen
        sucheingabe: (daten) => {
            dispatch({
                type: ACTIONS.SUCHEINGABE,
                payload: daten
            })
        },

        // Wird in der Suchseite aufgerufen
        parkplatzSuche: (sucheanfrage, weiter) => {
            dispatch(() => {
                // Lade alle Parkplätze nach Suchkriterien
                axios.get(`${BASE_URL}/parkplatz?aktiv=1&adresse=${sucheanfrage.ort}`)
                    .then((res) => {
                        dispatch({
                            type: ACTIONS.PARKPLATZ_SUCHE,
                            payload: res.data
                        })
                    })
            })

            weiter()
        },

        // Eingabe Formular Parkplatz
        parkplatzForm: (daten) => {
            dispatch({
                type: ACTIONS.PARKPLATZ_EINGABE,
                payload: daten
            })
        },


        //__________________________ Buchungen _________________________
        // Ladet die eigenen Buchungen
        buchungenLaden: (userID) => {
            dispatch(() => {
                // Lade alle Parkplätze des Nutzers
                axios.get(`${BASE_URL}/buchungen?users_like=X${userID}X`)
                    .then((res) => {

                        dispatch({
                            type: ACTIONS.BUCHUNGEN_LADEN,
                            payload: res.data
                        })
                    })
            })
        },

        // Neue Buchung erstellen
        buchungErstellen: (user, anfrage, parkplatz, weiter) => {

            const BUCHUNG_CONST = {
                mieter: user.id,
                mieterName: user.vorname + " " + user.nachname,
                vermieter: parkplatz.userID,
                users: "X" + user.id + "X" + parkplatz.userID + "X",
                parkplatz: parkplatz.id,
                adresse: parkplatz.adresse,
                name: parkplatz.name,
                foto1: parkplatz.foto1,
                preis: parkplatz.preis,
                von: anfrage.ab,
                bis: anfrage.bis
            }

            dispatch(() => {
                // Parkplatz Buchung an Datenbank senden
                axios.post(`${BASE_URL}/buchungen`, BUCHUNG_CONST)
                    .then((res) => {
                        // Props Aktuallisieren
                        dispatch({
                            type: ACTIONS.BUCHUNG_ERSTELLEN,
                            payload: res.data
                        })

                        weiter()
                    })
                    .catch((res) => { console.log("Parkplatz Buchen Fehler: ", res) })
            })
        },


        //__________________________ Nachrichten _________________________
        // Meine Nachrichten laden
        nachrichtenMeine: (userID) => {
            // Lade alle Nachrichten des Nutzers
            dispatch(() => {
                axios.get(`${BASE_URL}/nachrichten?users_like=X${userID}X`)
                    .then((res) => {
                        dispatch({
                            type: ACTIONS.NACHRICHTEN_MEINE,
                            payload: res.data
                        })
                    })

            })
        },

        //nachricht senden
        nachrichtenNeue: (userID, nachricht, weiter) => {
            dispatch(() => {
                // Neue Daten an den Server schicken
                axios.post(`${BASE_URL}/nachrichten`, nachricht)
                    .then((res) => {
                        // Lade alle Nachrichten des Nutzers
                        dispatch(() => {
                            axios.get(`${BASE_URL}/nachrichten?users_like=X${userID}X`)
                                .then((res) => {
                                    dispatch({
                                        type: ACTIONS.NACHRICHTEN_MEINE,
                                        payload: res.data
                                    })
                                })

                        })

                        weiter()
                    })
                    .catch((res) => { console.log("nachrichtenNeue error", res) })
            })
        },


        //__________________________ Helpers _________________________
        // Gibt den Nutzernamen zurück
        usernameById: (userID) => {
            dispatch(() => {
                // Lade den Username
                axios.get(`${BASE_URL}/users?id=${userID}`)
                    .then((res) => {
                        const USERNAME = res.data[0].vorname + " " + res.data[0].nachname
                        dispatch({
                            type: ACTIONS.USERNAME_BY_ID,
                            payload: USERNAME
                        })
                    })
            })
        },

    }
}

export default mapDispatchToProps