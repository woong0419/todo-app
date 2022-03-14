import React from "react";

const AuthContext = React.createContext({
  collections: [],
  modalMessage: '',
  status: {},
  collectionHandler: () => {},
  modalHandler: ()=>{},
  statusHandler: ()=>{}
});

export default AuthContext;