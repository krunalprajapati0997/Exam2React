import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loging from './Component/Loging'
import Registration from './Component/Registration'
// import Reg from './Component/Reg'
import Table from './Component/Table'
// import Update from './Component/Update'
// import AddUser from './Component/AddUser'
import Forgate from './Component/Forgate'
import Menubar from './Component/Menubar';
import Booklist from './Component/Booklist'
import UserList from './Component/UserList';
import MyProfile from './Component/MyProfile';
import AddBook from './Component/AddBook'
import Editbook from './Component/Editbook'
import EditProfile from './Component/MyProfile'

function App() {
  return (
    <div className="App">
      {/* <Sd/> */}
      <Router>
        
        {/* <Nav1/> */}
        <Switch>
          
          <Route exact path='/' component={Loging}/>
          <Route  exact path='/reg' component={Registration}/>
          <Route exact path='/table' component={Table}/>
          <Route exact path='/forgate' component={Forgate}/>
          <Route exact path='/menubar' component={Menubar}/>
          <Route exact path='/booklist' component={Booklist}/>
          <Route exact path='/userlist' component={UserList}/>
          <Route exact path='/myprofile' component={MyProfile}/>
          <Route exact path='/addbook' component={AddBook}/>
          <Route exact path='/:id' component={Editbook}/>
          <Route exact path='/my/:id' component={EditProfile}/>

          {/* <Route exact path='/r' component={Reg}/> */}
          {/* <Route exact path='/add' component={AddUser}/> */}
          {/* <Route exact path='/:id' component={Update}/> */}
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
