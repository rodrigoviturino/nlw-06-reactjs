// import { Button } from "./components/Button";
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { NewRoom } from "./Pages/NewRoom";
import { Home } from "./Pages/Home";

import { firebase, auth } from "./services/firebase";

// export const AuthContext = React.createContext({});
type UserType = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextType = {
  user: UserType | undefined,
  signInWithGoogle: () => Promise<void>; // Por retornar uma promisse, temos que informar tbm
}

export const AuthContext = React.createContext({} as AuthContextType);

function App() {

  const [user, setUser] = React.useState<UserType>();

  // Recuperando informação do usuario ao iniciar aplicação
  React.useEffect(() => {
    auth.onAuthStateChanged( (user) => {

      if(user){
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
  }, [])

  // Faça login no Google
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

      if(result.user){
        const { displayName, photoURL, uid } = result.user;

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }

  return (
    <BrowserRouter >
      <AuthContext.Provider value={{user, signInWithGoogle}}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}


export default App;
