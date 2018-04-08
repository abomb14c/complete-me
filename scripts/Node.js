class Node {
  constructor(data = null) {
    this.data = data;
    this.children = {};
    this.complete = false; 
    this.popularity = 0;
  }
}

module.exports = Node;