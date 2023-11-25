import { expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";

// use QueryClientProvider to wrap the component that uses useBreedList hook
// because the hook uses useQuery which uses react-query (we fake the query client)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});
//this is the new way to test hooks
test("give empty array when no animals provided ", () => {
  //the wrapper is the component that uses the hook
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
  const [breedList, status] = result.current;
  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});

test("gives back breeds when passing animal ", async () => {
  const breeds = ["havanese", "pooodle", "husky", "maltese"];
  //fake the fetch request
  //means next time fetch is called it will return this response
  fetch.mockResponseOnce(JSON.stringify({ animal: "dog", breeds }));
  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
  //wait for the hook to update
  await waitFor(() => expect(result.current[1]).toBe("success"));
  //check the result
  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});

/* old way
?this is the old way to test hooks make fake component that uses the hook and render it then return the hook value to test it
//the hooks needs to be in react component to work
function getBreedList(animal) {
  let list;

  // this is a fake component that uses the hook
  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }
  // render the component
  render(
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  );
  // return the list
  return list;
}

test("give empty array when no animals provided ", () => {
  const [breedList, status] = getBreedList();
  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});
*/
