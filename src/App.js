import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Spinner from './Spinner';
// Firestore와 통신하는 함수
import { loadBucketFB } from './redux/modules/bucket';

function App() {

  const loaded = useSelector(state => state.bucket.loaded);
  const bucket = useSelector(state => state.bucket.list);
  // Firestore 데이터 불러옴
  const dispatch = useDispatch();
  useEffect(() => { dispatch(loadBucketFB()) }, [])


  return (
    <div className="App">
      {loaded ? (
        bucket.map((item, index) => {
          return (
            <div key={index} style={{ border: "2px solid yellow"}}>
              {item.text}
            </div>
          )
        })
      ) : (
        <Spinner/>
    )}
    </div>
  )
}

export default App;