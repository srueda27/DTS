const urls = [
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/albums'
]

Promise.all(urls.map(url => {
  return fetch(url).then(response => response.json()) //make the REST call, then grab the response and turn it into a json object. All by fetch API
}))
  .then(results => {
    results.forEach(result => console.log(result))
  })
  .catch(error => console.log(error))


// -------------------------------------------------


  fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json)
    .then(data => console.log(data))

  // That is the same of this 

  async function fetchAlbums() {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const data = await response.json();
    console.log(data)
  }


// -------------------------------------------------

const urls = [
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/albums'
]

const getData = async function() {
  try {
    //destructured the results and give them names
    const [ posts, users, albums ] = await Promise.all(urls.map(url => {
      return fetch(url).then(response => response.json())
    }))
  
    console.log('posts: ', posts);
    console.log('users: ', users);
    console.log('albums: ', albums);
  } catch (err) {
    console.log('opps')
  }
}