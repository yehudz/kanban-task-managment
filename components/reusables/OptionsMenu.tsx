// React component imports
import React, {useState, useContext} from 'react';
import OptionsMenuButton from "../ui/OptionsMenuButton"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import appContext from '../../context/appContext';
// Typings imports
import { OptionMenuProps } from "../../typings/interfaces";

const OptionsMenu = ({menuItems}: OptionMenuProps)=> {
  const {setModalContentType} = useContext(appContext)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  const handleSelection = () => {
    setModalContentType("EDIT_TASK")
    setAnchorEl(null);
  };
  return(
    <div data-testid="options-menu-container">
      <OptionsMenuButton data-testid="options-menu-button" handleClick={handleClick}/>
      <Menu
        id="basic-menu"
        data-testid="options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleSelection}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems.map(item=> {
          return(
            <MenuItem onClick={handleSelection} data-testid="options-menu-option">{item}</MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}

export default OptionsMenu