const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch failed`);
  }
  //no need to await here, react-query will handle it
  // console.log(await apiRes.json());
  return apiRes.json();
};

export default fetchPet;
