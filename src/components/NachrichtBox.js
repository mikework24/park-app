import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux'
import mapStateToProps from '../redux/mapStateToProps'
import mapDispatchToProps from '../redux/mapDispatchToProps';

// MUI
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// functions
import timeToUhr from '../functions/timeToUhr';

/*
    {
      "vermieterName": "Udo B.",
      "titel": "Titel",
      "parkplatz": "5",
      "mieter": 1,
      "vermieter": "2",
      "nachricht": [
        {
          "von": 2,
          "zeit": 1684486477409,
          "text": "Ich würde gerne den Parkplatz jeden Montag von 8:00 - 11:00 Uhr nutzen wie können wir das machen?"
        }
      ],
      "id": 1
    }
*/

/*
╔═══════════════════════════════════════════╗
║       function AppFooter (Komponente)     ║
╚═══════════════════════════════════════════╝
*/
function NachrichtBox(props) {
  const inhalt = props.inhalt
  const user = props.user
  const key = props.key
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate()

  useEffect(() => {
    if(inhalt.vermieter !== 0){
      
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function erledigt() {

  }

  function loeschen() {

  }

  function melden() {

  }

  function schreiben() {

  }

  const nachricht_menu = [
    { name: 'Als erledigt markieren', click: erledigt },
    { name: 'Nachricht löschen', click: loeschen },
    { name: 'nachricht melden', click: melden }
  ];

  return (
    inhalt.nachricht &&
    <div className="nachrichtBox" key={key}>
      
      <div className="head">
        
        {/* TITEL */}
        <div className="titel">
          <p>{inhalt.vermieterName}</p>
          <span className="font14">{inhalt.titel !== "" && "Betreff: "}{inhalt.titel}</span>{/* prüfen mit wem geschieben wird und den namen ausgeben */}
        </div>
        
        {/* OPTIONS BUTTON */}
        <div className="optionM">
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Optionen">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {nachricht_menu.map((setting, index) => (
                <MenuItem key={index} onClick={() => {
                  setting.click ?
                    setting.click() :
                    navigate(setting.page)
                }}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </div>
      </div>

      {/* NACHRICHTEN TEXT */
        inhalt.nachricht.map((nachricht, index) => {
          return (
            <div key={index} className={nachricht.von === user.id ? "text ausRe" : "text ausLi"}>
              {nachricht.text}
              <div className="zeit font14">
                {timeToUhr(nachricht.zeit)}
              </div>
            </div>
          )
        })
      }

      {/* SENDEN BUTTON */}
      <div className="center buttonBox">
        <Button color="hightlight" variant="contained"
          onClick={schreiben}>Nachricht Schreiben</Button>
      </div>
    </div >
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(NachrichtBox);