import './style/index.scss';
import Routes from './components/Routes';
import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { getUser } from './actions/user.action';
import { UidContext } from './components/App.context';


function App() {

  const [Uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken= async() => {
      await axios({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true
      }).then((res) => {
        setUid(res.data);
      }).catch((err) => {
        console.log(err);
      })
    }
    fetchToken();

    if(Uid) dispatch(getUser(Uid));
  }, [Uid, dispatch])


  return (
    <UidContext.Provider value={Uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
