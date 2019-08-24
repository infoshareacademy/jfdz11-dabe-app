import React, { useContext } from "react";
import ContentApp from "./ContentApp";
import ContentAuth from "./ContentAuth";
import { ExpensesProvider } from "./contexts/ExpensesContext";
import { AuthContext } from "./contexts/AuthContext";

function App(props) {
  const authContext = useContext(AuthContext);
  return authContext.user ? (
    <ExpensesProvider>
      <ContentApp />
    </ExpensesProvider>
  ) : (
    <ContentAuth />
  );
}

export default App;
