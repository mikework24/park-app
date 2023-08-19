/*
╔═══════════════════════════════════════════╗
║     function CheckboxIcon (Komponente)    ║
╚═══════════════════════════════════════════╝
*/
function CheckboxIcon(props) {
  return (
        <div className={props.aktiv ? "checkboxIcon aktiv" : "checkboxIcon"}
        onClick={ (e)=>{props.onClick(e)} }>
          <div className="icon">

            {props.icon}

          </div>
          <div className={props.text ? "text" : "text flex"}>
            <p>{props.titel}</p>
            <span className="font14">{props.text}</span>
          </div>
        </div>
    );

}

export default CheckboxIcon;