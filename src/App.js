/* eslint-disable react-hooks/rules-of-hooks */
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

function App() {
  const queryClient = useQueryClient();
  const [change, setChange] = useState(true);

  const getRandMeal = async () => {
    const { data } = await axios.get(BASE_URL);
    console.log('api');
    return data;
  };

  const { isLoading, isError, data, error } = useQuery('recipe', getRandMeal, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 5000,
    cacheTime: Infinity,
    onSuccess: (data) => {
      // 성공시 호출
      console.log(data);
    },
    onError: (e) => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e.message);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // console.log(data.meals[0]);

  console.log(queryClient);

  return (
    <div className="App">
      <h1>react-query example</h1>
      <span>{data.meals[0].strMeal}</span>
      <button onClick={() => setChange(!change)}>Click</button>
    </div>
  );
}

export default App;
