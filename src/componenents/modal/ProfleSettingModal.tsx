import React, { useState } from "react";
// import { Modal, Tabs, Tab, Button } from "@material-ui/core";

type ProfileSettingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProfileSettingModal: React.FC<ProfileSettingModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}>
      <div style={modalStyle}>
        <h2>Profile Settings</h2>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}>
          <Tab label="General" />
          <Tab label="Privacy" />
          <Tab label="Notifications" />
        </Tabs>
        {activeTab === 0 && <div>General Settings Content</div>}
        {activeTab === 1 && <div>Privacy Settings Content</div>}
        {activeTab === 2 && <div>Notifications Settings Content</div>}
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          style={{ marginTop: "20px" }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
};

export default ProfileSettingModal;
