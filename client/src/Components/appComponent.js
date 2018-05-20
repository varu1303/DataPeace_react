import React from 'react';
import axios from 'axios';
import { Route, Switch, withRouter } from 'react-router-dom';


import Header from './headerComponent';
import Users from './usersComponent';
import User from './userComponent';
import NoMatch from './404';

const SpecialHeader = withRouter(props => <Header {...props} />);

class App extends React.Component {

  render() {
    return (
      <div>
        <SpecialHeader />
        <Switch>
          <Route exact path='/' component={Users}/>
          <Route path='/user/:id' component={User}/>
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default App;
