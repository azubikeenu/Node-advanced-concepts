class JphCommentsApi {
  constructor() {}
  fetchComments() {
    return fetch('https://jsonplaceholder.typicode.com/comments');
  }
}

module.exports = new JphCommentsApi();
