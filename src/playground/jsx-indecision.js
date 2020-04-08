console.log('App.js is running!');

// JSX - JavaScript XML
const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer!',
  options: []
};

const submitOptionForm = (event) => {
  event.preventDefault();
  const option = event.target.elements.option.value;
  if (option) {
    app.options.push(option);
    event.target.elements.option.value = '';
    renderReactApp();
  }
};

const clearOptions = () => {
  app.options = [];
  renderReactApp();
};

const makeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const selectedOption = app.options[randomNum];
  alert(selectedOption);
};


const appRoot = document.getElementById('app');
const numbers = [55, 101, 1000];


const renderReactApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No Options'}</p>
      <button disabled={app.options.length === 0} onClick={makeDecision}>Make A Decision</button>
      <button onClick={clearOptions}>Remove All</button>
      <ol>
        {
          app.options.map(option => {
            return <li key={option}>{option}</li>
          })
        }
      </ol>
      <form onSubmit={submitOptionForm}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );


  ReactDOM.render(template, appRoot);
}

renderReactApp();
