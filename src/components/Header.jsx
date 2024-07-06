import AppsIcon from '@mui/icons-material/Apps';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import './Header.css';

const Header = ({ photoURL }) => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" alt="Google Drive" />
        <span>Drive</span>
      </div>
      <div className="header-search">
        <SearchIcon />
        <input type="text" placeholder="Search in Drive" />
        <FormatAlignCenterIcon />
      </div>
      <div className="header-icons">
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <span>
          <AppsIcon />
          <Avatar src={photoURL} />
        </span>
      </div>
    </div>
  );
}

export default Header;
