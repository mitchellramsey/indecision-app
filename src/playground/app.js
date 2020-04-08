class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: props.options
    }
  };
  componentDidMount() {
    try {
      const data = JSON.parse(localStorage.getItem('optionData'));
      if (data) {
        this.setState(() => ({ options: data }));
      }
      console.log('fetchingData');
    } catch (e) {

    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('optionData', json);
      console.log('savingData');
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }))
  };
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }))
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    console.log(this.state.options[randomNum]);
  };

  handleAddOption(value) {
    if (!value) {
      return 'Cannot submit an empty value';
    } else if (this.state.options.indexOf(value) > -1) {
      return 'Option has already been added';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(value)
    }));
  }
  render() {
    const title = 'Indecision App'
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header
          title={title}
          subtitle={subtitle}
        />
        <Action
          hasOptions={this.state.options.length > 0 ? true : false}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    )
  }
}

IndecisionApp.defaultProps = {
  options: []
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  )
}

Header.defaultProps = {
  title: 'Indecision'
}

const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What Should I Do?
        </button>
    </div>
  )
}

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option to get started</p>}
      {props.options.map(option => (
        <Option
          key={option}
          option={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </div>
  )
}

const Option = (props) => {
  return (
    <div>
      <p key={props.option}>{props.option}</p>
      <button
        onClick={(event) => {
          event.preventDefault();
          props.handleDeleteOption(props.option);
        }}
      >
        Remove Option
      </button>
    </div>
  )
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddOption(event) {
    event.preventDefault();
    const value = event.target.elements.option.value.trim();
    const error = this.props.handleAddOption(value);
    this.setState(() => ({ error }));
    event.target.elements.option.value = "";
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));