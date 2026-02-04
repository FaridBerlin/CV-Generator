import React from 'react';
import styles from './MobileToggle.module.css';

function MobileToggle({ handleToggle, mobile }) {
  return (
    <button type="button" className={styles['toggle']} onClick={handleToggle}>
      <img 
        src={mobile.formIsOpen ? require("../../icons/preview.png") : require("../../icons/editor.png")} 
        alt="Mobile View Toggle"
      />
      {mobile.formIsOpen ? "Preview" : "Editor"}
    </button>
  );
}

export default MobileToggle;