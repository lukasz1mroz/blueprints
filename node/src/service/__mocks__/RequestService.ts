const posts = [
  {
    userId: 1,
    id: 1,
    title: 'Mock post one',
    body: 'Mock post one body',
  },
  {
    userId: 2,
    id: 2,
    title: 'Mock post two',
    body: 'Mock post two body',
  },
  {
    userId: 3,
    id: 3,
    title: 'Mock post three',
    body: 'Mock post three body',
  },
];

export const request = (method: string, url: string, param: string) => {
  return new Promise((resolve, reject) => {
    //if (method === 'POST') resolve({ data: 'Post success', status: 200 });
    const data = param ? posts.find((post) => post.id === Number(param)) : posts;
    data === undefined ? reject({ data: 'Error', status: 500 }) : resolve({ data: data, status: 200 });
  });
};
