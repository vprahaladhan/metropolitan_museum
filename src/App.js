import React from 'react';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';

import './App.css';

const App = () => {
  const intervalRef = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false); 
  const [objectIDs, setObjectIDs] = React.useState([]);
  const [currentObject, setCurrentObject] = React.useState();

  const baseURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;

  React.useEffect(() => {
    fetchObjectIDs();
  }, []);

  React.useEffect(() => {
    !!objectIDs.length && fetchObject() && start();
  }, [objectIDs]);

  React.useEffect(() => {
    !!objectIDs.length && fetchObject();
  }, [index]);

  const fetchObjectIDs = async () => {
    setLoading(true);
    const {objectIDs} = (await axios.get(baseURL)).data; 
    setObjectIDs(objectIDs);
    setLoading(false);
  };

  const fetchObject = async () => {
    setCurrentObject((await axios.get(`${baseURL}/${objectIDs[index]}`)).data);
  }

  const start = () => {
    intervalRef.current = setInterval(() => {
      setIndex(index => index + 1);
    }, 10000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
    intervalRef.current = setInterval(() => {
      setIndex(index => index + 1);
    }, 10000);
  };

  return (
    loading ? 
      <div className="spinner"><BounceLoader size="100px" /></div> :
      <div className="app">
      </div>
  );
}

export default App;
