class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.onToggleInfo = this.onToggleInfo.bind(this)
    this.state = {
      isVisible: false
    }
  }
  onToggleInfo() {
    this.setState((prevState) => {
      return {
        isVisible: !prevState.isVisible
      }
    })
  }
  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.onToggleInfo}>{this.state.isVisible ? 'Hide Details' : 'Show Details'}</button>
        {this.state.isVisible && <p>Hey. These are some details you can now see!</p>}
      </div>
    )
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));
