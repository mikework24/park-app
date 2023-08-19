function timeToUhr(props) {
    
    let antwort = props
    if(String(new Date(props)) !== "Invalid Date"){
        const now = new Date(props).toLocaleString('de-DE').slice(11, 16)
        return `${now} Uhr`
    }
    
    if(String(Number(props)) !== "NaN" ){
        const now = new Date(Number(props)).toLocaleString('de-DE').slice(11, 16)
        return `${now} Uhr`
    }
    
    return antwort
}

export default timeToUhr;