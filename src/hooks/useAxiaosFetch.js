import { useState, useEffect } from 'react'
import axios from 'axios'
const useAxiaosFetch = (dataurl) => {
  console.log(dataurl,"****URL***")
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {

    let ismounted = true
    const source = axios.CancelToken.source();
    const fetchData = async (url) => {
      setLoading(true);
      try {
        const res = await axios.get(url, {
          cancelToken: source.token
        })
        if (ismounted) {
          setData(res.data);
          setFetchError(null);
        }

      } catch (err) {
        if (ismounted) {
          setFetchError(err.message);
          setData([]);
        }

      } finally {
        setLoading(false)

      }

    }
    fetchData(dataurl);

    return () => {
      ismounted = false
      source.cancel()
    };


  }, [dataurl]) 

  return{data,fetchError,isloading};

}

export default useAxiaosFetch