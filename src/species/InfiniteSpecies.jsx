import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import {useInfiniteQuery} from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {

  const {hasNextPage, fetchNextPage, data, isLoading, isFetching, isError} = useInfiniteQuery("species",  ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined
    }
  })

  if(isLoading){
    return <div>Loading...</div>
  }

  if(isError){
    return <div>Error</div>
  }

  return (<>
    {isFetching && <div className={"loading"}> Fetching...</div>}

    {data.pages.map((page) =>
      page.results.map((specie) => {
        return <Species name={specie.name} averageLifespan={specie.average_lifespan} language={specie.language}/>
      })
    )
    }
    {!isFetching && <button onClick={fetchNextPage} disabled={!hasNextPage}>Load more</button>}
  </>);
}
