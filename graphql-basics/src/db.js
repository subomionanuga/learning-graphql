const users = [
  {
    id: "1",
    name: "Subomi",
    email: "subomi@subomi.com",
    age: 25
  },
  {
    id: "2",
    name: "John",
    email: "john@john.com",
    age: 78
  }
];

const posts = [
  {
    id: "5",
    title: "First Post",
    body: "Nothing to report",
    published: 2017,
    author: "1"
  },
  {
    id: "6",
    title: "Second Post",
    body: "Something to report",
    published: 2018,
    author: "1"
  },
  {
    id: "7",
    title: "Third Post",
    body: "Just for the sake of it",
    published: 2019,
    author: "2"
  }
];

const comments = [
  {
    id: "11",
    body: "This is my first comment",
    author: "1",
    onPost: "5"
  },
  {
    id: "12",
    body: "This is my second comment",
    author: "2",
    onPost: "6"
  },
  {
    id: "13",
    body: "This is my third comment",
    author: "1",
    onPost: "7"
  },
  {
    id: "14",
    body: "This is my fourth comment",
    author: "1",
    onPost: "5"
  }
];

const db = { users, posts, comments };

export { db as default };
