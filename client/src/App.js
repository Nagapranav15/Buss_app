import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import  AppBar  from './components/AppBar';
import Buslist from './components/Buslist';
import Mybookings from './components/Mybookings';
import Aboutus from './components/Aboutus';
import BusList from './components/Buslist';

function App({store}) {

  function Page(){
    switch(store.getState().NavReducers){
      case "Login":
        return(<div><Login store={store}/></div>)
      case "Registration":
        return(<div><Registration/></div>)
      case "Buslist":
        return (<div><Buslist/></div>)
      case "Mybookings":
        return (<div><Mybookings/></div>)
      case "Aboutus":
        return (<div><Aboutus/></div>)
      default:
        return(<div><Buslist/></div>)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
         Online Bus ticket Reservation system
        </p>
      </header>
      <div className="App-body">
        <AppBar store={store}/>
        <center><Page/></center>
        
      </div>
    </div>
  );
}

export default App;