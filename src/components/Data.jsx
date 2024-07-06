import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListIcon from '@mui/icons-material/List';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { db } from '../FirebaseConfig';

const Data = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "myfiles"), (snapshot) => {
      setFiles(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="data-container">
      <div className="data-header">
        <div className="header-left">
          <p>My Drive</p>
          <ArrowDropDownIcon />
        </div>
        <div className="header-right">
          <ListIcon />
          <InfoOutlinedIcon />
        </div>
      </div>
      <div className='data'>
        <div className="data-grid">
          {files.map(({ id, data }) => (
            <div key={id} className="data-file">
              <InsertDriveFileIcon />
              <p>{data.filename}</p>
            </div>
          ))}
        </div>
        <div className="data-list-row">
          <p><b>Name <ArrowDownwardIcon /></b></p>
          <p><b>Owner</b></p>
          <p><b>Last Modified</b></p>
          <p><b>File Size</b></p>
        </div>
        {files.map(({ id, data }) => (
          <div key={id} className="data-list-row">
            <a href={data.fileURL} target='_blank' rel='noopener noreferrer'>
              <p><InsertDriveFileIcon /> {data.filename}</p>
            </a>
            <p>Me</p>
            <p>Yesterday</p>
            <p>{data.size} bytes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
