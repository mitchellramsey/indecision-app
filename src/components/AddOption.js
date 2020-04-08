import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined
  };
  handleAddOption = (event) => {
    event.preventDefault();
    const value = event.target.elements.option.value.trim();
    const error = this.props.handleAddOption(value);
    this.setState(() => ({ error }));
    event.target.elements.option.value = "";
  };
  render() {
    return (
      <div>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        <form className='form' onSubmit={this.handleAddOption}>
          <input className='form__input' type="text" name="option" />
          <button className='button'>Add Option</button>
        </form>
      </div>
    )
  };
}