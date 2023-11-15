const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) throw new Error("animal is required");

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch failed`);
  }
  //no need to await here, react-query will handle it
  // console.log(await apiRes.json());
  return apiRes.json();
};

export default fetchBreedList;
