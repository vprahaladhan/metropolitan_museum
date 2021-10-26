import React from 'react';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';

import './App.css';

const App = () => {
  const intervalRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [objectIDs, setObjectIDs] = React.useState([]);

  const baseURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;

  const fetchObjectIDs = async () => {
    setLoading(true);
    const {objectIDs} = (await axios.get(baseURL)).data.objectIDs; 
    setObjectIDs(objectIDs);
    setLoading(false);
  }; 

  return (
    loading ? 
      <div className="spinner"><BounceLoader size="100px" /></div> :
      <div className="app">
      </div>
  );
}

export default App;
