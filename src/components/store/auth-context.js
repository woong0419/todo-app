import React from "react";

const AuthContext = React.createContext({
  collections: [],
  collectionHandler: () => {}
});

export default AuthContext;