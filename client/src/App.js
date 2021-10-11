import React, { useEffect, useState } from "react";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import { Router } from "react-router-dom";
import Header from "./components/Header";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  // if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
  //   return <Spinner className="app-spinner dark" />;
  // }
  return (
    <div className ="App">
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
    </div>
  );

}
export default App;

