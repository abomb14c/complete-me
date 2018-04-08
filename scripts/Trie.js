const Node = require('../scripts/Node');

class Trie {
  constructor() {
    this.wordCount = 0; 
    this.root = new Node();
    this.suggestionArray = []
    // this.children = {};
  }

  insert(word) {
    let wordLowerCase = word.toLowerCase();
    let splitWordArray = [...wordLowerCase]
    let currentNode = this.root;

    splitWordArray.forEach( letter => {
      if(!currentNode.children[letter]){
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })
    if(!currentNode.complete) {
      currentNode.complete = wordLowerCase; 
      this.wordCount++; 
    }
  }

  suggest (word) {
    this.suggestArray = [];
    let wordArray = [...word.toLowerCase()];
    let childrenKeys = Object.keys(this.root.children);

      if (!childrenKeys.includes(word[0])) {
      return this.suggestArray;
    }

    let currentNode = this.root;

    for (let i = 0; i < wordArray.length; i++) {
      currentNode = currentNode.children[wordArray[i]];
    }
    this.findWord(currentNode);
    return this.suggestArray;
  }

  findWord(currentNode) {
    let childNodes = Object.keys(currentNode.children);
    childNodes.forEach((child) => {
 
      if(currentNode.children[child].complete) {
        if(currentNode.children[child].popularity === 0){
          this.suggestArray.push(currentNode.children[child].complete);
          this.findWord(currentNode.children[child])
        } else {
          this.suggestArray.unshift(currentNode.children[child].complete)
        }
      } else {
        this.findWord(currentNode.children[child])
      }
    })
  }


  select(word){
    let wordArray = [...word]
    let firstLetter = wordArray[0]
    let currentNode = this.root.children

    while(wordArray.length > 1){
      let found = Object.keys(currentNode).find(node => node === wordArray[0])

      if (found) {
        currentNode = currentNode[wordArray[0]].children;
      }
     wordArray.shift()
    }
   currentNode[wordArray[0]].popularity++
   return currentNode
  }


  populate(array){
    array.forEach(word => {
      this.insert(word)
    })
  }
}


module.exports = Trie;