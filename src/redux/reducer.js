import * as ACTIONS from './actionTypeStrings'

// initialer Wert des States
const initState = {
    login: {
        email: "",
        hash: ""
    },
    user: {
        email: "",
        vorname: "",
        nachname: "",
        passwort: "",
        hash: "",
        favoriten: ""
    },
    buchungen: [],
    nachrichten: [],
    parkplatz: [],
    parkplatzNeu: {
        userID: "",
        aktiv: false,
        // Seite 1
        adresse: "",
        name: "",
        preis: "",
        preisOptionen: false,
        preisTag: "",
        preisWoche: "",
        preisMonat: "",
        // Seite 2
        parkplatzGroesse: "",
        breite: "",
        laenge: "",
        hoehe: "",
        kg: "",
        parkplatzMehr: false,
        parkplatzDetails: false,
        extraBreit: false,
        barrierefrei: false,
        ueberdachung: false,
        abgeschlossen: false,
        garage: false,
        tankstelle: false,
        anbindung: false,
        ladestation: false,
        // Seite 3
        foto1: "",
        foto2: "",
        foto3: "",
        foto4: "",
        beschreibung: "",
        // Seite 4
        uhrzeitAb: "8:00",
        uhrzeitBis: "17:00",
        montag: false,
        dienstag: false,
        mittwoch: false,
        donnerstag: false,
        freitag: false,
        samstag: false,
        sonntag: false,
        datumFestlegen: false,
        datumAb: "",
        datumBis: ""
    },
    suche: {
        ort: "",
        ab: "",
        bis: "",
        fahrzeugTyp: ""
    },
    suchergebnis: [],
    fahrzeug: [],
    fahrzeugNeu: {
        id: "",
        userID: "",
        name: "",
        nummernschild: "",
        typ: "",
        genau: false,
        laenge: "",
        hoehe: "",
        breite: "",
        kg: "",
        extraBreite: false,
        barrierefrei: false
    },
    usernameFromId: ""

}

const reducer = (state = initState, action) => {

    switch (action.type) {
        //__________________________ USERS _________________________
        case ACTIONS.SAVE_USER:
            return {
                ...state,
                user: action.payload
            }

        case ACTIONS.SAVE_LOGIN:
            return {
                ...state,
                login: action.payload
            }

        //__________________________ FAHRZEUG _________________________
        case ACTIONS.FAHRZEUG_HINZUFUEGEN:
            return {
                ...state,
                fahrzeug: [...state.fahrzeug, action.payload]
            }

        case ACTIONS.FAHRZEUG_AENDERN:
            let NEW_FAHRZEUGE = state.fahrzeug.map((value) => {
                return value.id === action.payload.id ? action.payload : value
            })

            return {
                ...state,
                fahrzeug: NEW_FAHRZEUGE
            }

        case ACTIONS.FAHRZEUG_MEINE:
            return {
                ...state,
                fahrzeug: action.payload
            }

        case ACTIONS.FAHRZEUG_BEARBEITEN:
            if (action.payload == "neu") {
                return {
                    ...state,
                    fahrzeugNeu: {
                        name: "",
                        nummernschild: "",
                        typ: "",
                        genau: false,
                        laenge: "",
                        hoehe: "",
                        breite: "",
                        kg: "",
                        extraBreite: false,
                        barrierefrei: false
                    }
                }
            } else {
                
                let FAHRZEUG_DATEN = state.fahrzeug.filter((value) => {
                    return value.id === action.payload
                })

                return {
                    ...state,
                    fahrzeugNeu: FAHRZEUG_DATEN[0]
                }

            }


        //Eingabefeld Only States
        case ACTIONS.FAHRZEUG_NEU_EINGABE:
            return {
                ...state,
                fahrzeugNeu: {
                    ...state.fahrzeugNeu,
                    [action.payload.target.name]: action.payload.target.type === 'checkbox' ?
                        action.payload.target.checked :
                        action.payload.target.value
                }
            }

        //Eingabefeld Only States
        case ACTIONS.FAHRZEUG_NEU_LEEREN:
            return {
                ...state,
                fahrzeugNeu: {
                    name: "",
                    nummernschild: "",
                    typ: "",
                    genau: false,
                    laenge: "",
                    hoehe: "",
                    breite: "",
                    kg: "",
                    extraBreite: false,
                    barrierefrei: false
                }
            }

        //__________________________ PARKPLATZ _________________________
        //Eingabefeld Only States
        case ACTIONS.PARKPLATZ_EINGABE:
            return {
                ...state,
                parkplatzNeu: {
                    ...state.parkplatzNeu,
                    [action.payload.target.name]: action.payload.target.type === 'checkbox' ?
                        action.payload.target.checked :
                        action.payload.target.value
                }
            }

        //Eingabefeld Only States
        case ACTIONS.PARKPLATZ_LEEREN:
            return {
                ...state,
                parkplatzNeu: {
                    userID: "",
                    aktiv: false,
                    // Seite 1
                    adresse: "",
                    name: "",
                    preis: "",
                    preisOptionen: false,
                    preisTag: "",
                    preisWoche: "",
                    preisMonat: "",
                    // Seite 2
                    parkplatzGroesse: false,
                    breite: "",
                    laenge: "",
                    hoehe: "",
                    kg: "",
                    parkplatzMehr: false,
                    parkplatzDetails: false,
                    extraBreit: false,
                    barrierefrei: false,
                    ueberdachung: false,
                    abgeschlossen: false,
                    garage: false,
                    tankstelle: false,
                    anbindung: false,
                    ladestation: false,
                    // Seite 3
                    foto1: "",
                    foto2: "",
                    foto3: "",
                    foto4: "",
                    beschreibung: "",
                    // Seite 4
                    uhrzeitAb: "8:00",
                    uhrzeitBis: "17:00",
                    montag: false,
                    dienstag: false,
                    mittwoch: false,
                    donnerstag: false,
                    freitag: false,
                    samstag: false,
                    sonntag: false,
                    datumFestlegen: false,
                    datumAb: "",
                    datumBis: ""
                }
            }

        case ACTIONS.PARKPLATZ_HINZUFUEGEN:
            return {
                ...state,
                parkplatz: [...state.parkplatz, action.payload]
            }

        case ACTIONS.PARKPLATZ_AENDERN:
            let NEW_PARKPLATZ = state.parkplatz.map((value) => {
                return value.id === action.payload.id ? action.payload : value
            })

            return {
                ...state,
                parkplatz: NEW_PARKPLATZ
            }

        case ACTIONS.PARKPLATZ_MEINE:
            return {
                ...state,
                parkplatz: action.payload
            }

        //__________________________ PARKPLATZ -> SUCHE _________________________
        //Only States
        case ACTIONS.PARKPLATZ_SUCHE:
            return {
                ...state,
                suchergebnis: action.payload
            }

        //Only States
        case ACTIONS.SUCHEINGABE:
            return {
                ...state,
                suche: {
                    ...state.suche,
                    [action.payload.name]: action.payload.value
                }
            }

        //__________________________ BUCHUNGEN _________________________
        case ACTIONS.BUCHUNGEN_LADEN:
            return {
                ...state,
                buchungen: action.payload
            }

        case ACTIONS.BUCHUNG_ERSTELLEN:
            return {
                ...state,
                buchungen: [...state.buchungen, action.payload]
            }

        //__________________________ NACHRICHTEN _________________________
        case ACTIONS.NACHRICHTEN_MEINE:
            return {
                ...state,
                nachrichten: [...action.payload]
            }

        //__________________________ HELPERS _________________________
        //Only States
        case ACTIONS.USERNAME_BY_ID:
            return {
                ...state,
                usernameFromId: action.payload
            }


        default:
            return state
    }

}

export default reducer