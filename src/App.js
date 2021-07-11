import { BrowserRouter,Switch,Route} from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';

function App() {
  return (
    <>
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main}/>
      </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
