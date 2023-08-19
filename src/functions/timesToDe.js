function timesToDe(von, bis) {

    let vonDate, bisDate

    if(String(Number(von)) !== "NaN" && String(Number(bis)) !== "NaN" ){
        vonDate = new Date(Number(von))
        bisDate = new Date(Number(bis))
    }

    if(String(new Date(von)) !== "Invalid Date" && String(new Date(bis)) !== "Invalid Date"){
        vonDate = new Date(von)
        bisDate = new Date(bis)
    }

    if(vonDate !== undefined && bisDate !== undefined){
        if(vonDate.getDate() === bisDate.getDate()){
            return `${vonDate.toLocaleString('de-DE').slice(11, 16)} - ${bisDate.toLocaleString('de-DE').slice(11, 16)} Uhr`
        }else{
            return `${vonDate.toLocaleString('de-DE').slice(0, 16)} - ${bisDate.toLocaleString('de-DE').slice(11, 16)} Uhr`
        }
    }

    return vonDate + " - " + bisDate
}

export default timesToDe;