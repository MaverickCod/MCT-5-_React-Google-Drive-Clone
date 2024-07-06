import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DevicesIcon from '@mui/icons-material/Devices';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Modal from '@mui/material/Modal';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { db, storage } from '../Firebase';
import './SideBar.css';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log('Upload started');
    setUploading(true);

    const fileRef = ref(storage, `files/${file.name}`);
    await uploadBytes(fileRef, file).then(async (snapshot) => {
      console.log('File uploaded:', snapshot);

      const url = await getDownloadURL(snapshot.ref);
      await setDoc(doc(db, 'myfiles', file.name), {
        timestamp: serverTimestamp(),
        filename: file.name,
        fileURL: url,
        size: snapshot.metadata.size,
      });
      
      setUploading(false);
      setFile(null);
      setOpen(false);
    }).catch((error) => {
      console.error('Error during upload:', error);
      setUploading(false);
    });
  };

  
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="modal-popup">
          <form onSubmit={handleUpload}>
            <div className="modal-heading">
              <h3>Select file you want to upload</h3>
            </div>
            <div className="modal-body">
              {uploading ? (
                <div className="uploading-para">Uploading...</div>
              ) : (
                <>
                  <input type="file" className="modal__file" onChange={handleFile} />
                  <input type="submit" className="modal__submit" />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>

      <div className="sidebar-container">
        <div className="sidebar-btn">
          <button onClick={() => setOpen(true)}>
            <img
              src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E"
              alt="New"
            />
            <span>New</span>
          </button>
        </div>
        <div className="sidebar-options">
          <div className="sidebar-option">
            <MobileScreenShareIcon />
            <span>My Drive</span>
          </div>
          <div className="sidebar-option">
            <DevicesIcon />
            <span>Computers</span>
          </div>
          <div className="sidebar-option">
            <PeopleAltOutlinedIcon />
            <span>Shared with me</span>
          </div>
          <div className="sidebar-option">
            <QueryBuilderOutlinedIcon />
            <span>Recent</span>
          </div>
          <div className="sidebar-option">
            <StarBorderOutlinedIcon />
            <span>Starred</span>
          </div>
          <div className="sidebar-option">
            <DeleteOutlineOutlinedIcon />
            <span>Trash</span>
          </div>
        </div>
        <hr />
        <div className="sidebar-options">
          <div className="sidebar-option">
            <CloudQueueIcon />
            <span>Storage</span>
          </div>
          <div className="progress_bar">
            <progress size="tiny" value="50" max="100" />
            <span>105 GB of 200 GB used</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
