import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Home = () => {

  const { searchResults, isloading, fetchError } = useContext(DataContext);
  return (
    <main className='Home'>
      {isloading && (
        <>
          <Skeleton height={30} width={200} />
          <Skeleton count={2} />
          <Skeleton height={30} width={200} />
          <Skeleton count={2} />
          <Skeleton height={30} width={200} />
          <Skeleton count={2} />
          <Skeleton height={30} width={200} />
          <Skeleton count={2} />
          <Skeleton height={30} width={200} />
          <Skeleton count={2} />
          <Skeleton height={30} width={200} />
          <Skeleton count={2} />
        </>
      )}
      {!isloading && fetchError && <p className='statusMsg' style={{ color: "red" }} >{fetchError}</p>}
      {!isloading && !fetchError && (
        searchResults.length ? (
          <Feed posts={searchResults} />
        ) : "No posts found here!!"     )}

    </ main>
  )
}

export default Home
