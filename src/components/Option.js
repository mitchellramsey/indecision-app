import React from 'react';

const Option = (props) => (
  <div className='option'>
    <p className='option__text'>{props.count}. {props.option}</p>
    <button
      onClick={(event) => {
        event.preventDefault();
        props.handleDeleteOption(props.option);
      }}
      className='button button--link'
    >
      Remove Option
    </button>
  </div>
)

export default Option;