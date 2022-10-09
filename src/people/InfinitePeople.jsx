import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import {useInfiniteQuery} from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, isFetching, isLoading, isError, fetchNextPage, hasNextPage} = useInfiniteQuery("people",  ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(isError){
    return <div>Error</div>
  }

  return (
    <>
      {isFetching && <div className={"loading"}> Fetching...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((page) => {
          return page.results.map((person) => {
            return <Person
              key={person.name}
              name={person.name}
              eyeColor={person.eye_color}
              hairColor={person.hair_color}/>;
          });
        })}
      </InfiniteScroll>
    </>

  )
}
