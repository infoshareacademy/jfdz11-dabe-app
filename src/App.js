import React, { useContext } from "react";
import ContentApp from "./ContentApp";
import ContentAuth from "./ContentAuth";
import { AuthContext } from "./contexts/AuthContext";

function App(props) {
  const authContext = useContext(AuthContext);
  return authContext.user ? <ContentApp /> : <ContentAuth />;
}

export default App;
