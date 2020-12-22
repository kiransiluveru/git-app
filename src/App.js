import {Router, Route, hashHistory} from 'react-router';
import { Provider } from 'react-redux'
import './App.css';
import Users from './components/Users';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="container">
      <Provider store={store} >
        <Router history={hashHistory}>
          <Route path="/" component={Users} />
          <Route path="/user/:userName" component={UserProfile} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
