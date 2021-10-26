import React from 'react';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';

import './App.css';
import ObjectDetails from './ObjectDetails';

const App = () => {
  const secondsRef = React.useRef(null);
  const intervalRef = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
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
      clearInterval(secondsRef);
      setSeconds(0);
    }, 10000);
    secondsRef.current = setInterval(() => setSeconds(seconds => seconds + 1), 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    clearInterval(secondsRef.current);
    setIsPaused(true);
  };

  const resume = () => {
    secondsRef.current = setInterval(() => setSeconds(seconds => seconds + 1), 1000);
    setIsPaused(false);
    setTimeout(() => {
      clearInterval(secondsRef.current);
      setIndex(index => index + 1);
      setSeconds(0);
      start();
    }, 10000 - seconds * 1000);
  };

  return (
    loading ? 
      <div className="spinner"><BounceLoader size="100px" /></div> :
      <div className="app">
        <div>Seconds: {seconds}</div>
        {isPaused && <ObjectDetails object={currentObject} closeDetails={resume} />}
        <div className="object-details" onClick={pause}>
          {currentObject && `${currentObject.title} : ${currentObject.objectID}`}
        </div>
      </div>
  );
}

export default App;
