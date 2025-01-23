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

// for await of, allows us to loop through an array of promises after they are settled

const getData2 = async function() {
  const arrayOfPromises = urls.map(url => fetch(url));

  for await (let request of arrayOfPromises) {
    const data = await request.json();
    console.log(data);
  }
}