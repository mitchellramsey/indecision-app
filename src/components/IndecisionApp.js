import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: this.props.options,
    selectedOption: undefined
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }))
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }))
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }))
  };
  handleAddOption = (value) => {
    if (!value) {
      return 'Cannot submit an empty value';
    } else if (this.state.options.indexOf(value) > -1) {
      return 'Option has already been added';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(value)
    }));
  };
  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }
  componentDidMount() {
    try {
      const data = JSON.parse(localStorage.getItem('optionData'));
      if (data) {
        this.setState(() => ({ options: data }));
      }
      console.log('fetchingData');
    } catch (e) {

    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('optionData', json);
      console.log('savingData');
    }
  };
  componentWillUnmount() {
    console.log('componentWillUnmount')
  };
  render() {
    const title = 'Indecision App'
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header
          title={title}
          subtitle={subtitle}
        />
        <div className='container'>
          <Action
            hasOptions={this.state.options.length > 0 ? true : false}
            handlePick={this.handlePick}
          />
          <div className='widget'>
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          onModalBtnClick={this.handleClearSelectedOption}
        />
      </div>
    )
  };
}

IndecisionApp.defaultProps = {
  options: []
}