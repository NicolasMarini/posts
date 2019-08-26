export const fetchPhotos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await response.json();
  return data;
}

export const fetchData = async (url) => {
  console.log("FETCHING")
  const response = await fetch(url);
  const data = await response.json();
  console.log("data::: ", data)
  return data;
}