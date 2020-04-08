import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
    isOpen={!!props.selectedOption}
    onRequestClose={props.onModalBtnClick}
    contentLabel="Selected Option"
  >
    <h3>Selected Option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.onModalBtnClick}>Close</button>
  </Modal>
);

export default OptionModal;