/* eslint-disable react-hooks/rules-of-hooks */
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

function App() {
  const callApi = async () => {
    const { data } = await axios.get(BASE_URL);
    return data;
  };

  // const getRandRecipe = () => {
  //   const query = useQuery('recipe', callApi);
  //   console.log(query);
  // };

  // useEffect(() => {
  //   getRandRecipe();
  // }, []);

  const query = useQuery('recipe', callApi, {
    refetchOnWindowFocus: false,
  });
  console.log(query.data);

  return (
    <div className="App">
      <h1>react-query example</h1>
    </div>
  );
}

export default App;
