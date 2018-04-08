const chai = require('chai');
const assert = chai.assert
const Node = require('../scripts/Node');
const Trie = require('../scripts/Trie');

import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie',() => {

  let trie;
  beforeEach(()=> {
     trie = new Trie()  
  })

  it('should be a class',() => {
    assert.isFunction(Trie)
    })

  it('should track the total words', () => {
    assert.equal(trie.wordCount, 0)
  })

  it('should have a new node as a root', () => {
    let node = new Node()

    assert.deepEqual(trie.root, node)
  })

  it('should have an empty suggestion array', () => {
    let suggestionArray = []

    assert.deepEqual(trie.suggestionArray, suggestionArray)
  })

  describe('insert method', () => {

    it('should take in a word', () => {
      trie.insert('hello')
      assert.equal(trie.wordCount, 1)
    })

    it('should only count a word once', () => {
      trie.insert('peanut')
      trie.insert('peanut')
      assert.equal(trie.wordCount, 1)
    })

    it('should take a word and break it down into nodes', () => {
      trie.insert('hello')
      assert.isNotNull(trie.root.children.h.children.e.children.l.children.l.children.o)
    })

    it('should not create an additional node after a word is complete', () => {
      trie.insert('hey')
      assert.deepEqual(trie.root.children.h.children.e.children.y.children, {})
    })

    it('should update the complete value of the node after a word has been completed', () => {
      trie.insert('hey')
      assert.equal(trie.root.children.h.children.e.children.y.complete, 'hey')
    })
  })

  describe('suggest method', () => {

    beforeEach(() => {
      trie.insert('create');
      trie.insert('crash');
      trie.insert('crazy');
      trie.insert('hope');
      trie.insert('cringe');
    })
  
  it('should return an empty array if the words in the trie do not match the letter passed in',() => {
    const result = trie.suggest('r')

    assert.deepEqual(result, [])
  })

  it('should suggest words based on the letter passed in', () => {
    const result = trie.suggest('c');

    assert.deepEqual(result, [ 'create', 'crash', 'crazy', 'cringe'])
  })




  })

  describe('Populate', () => {
    it('should insert the dictionary into the trie', () => {
      trie.populate(dictionary)
      assert.equal(trie.wordCount, 234371)
    })
  })
  describe('Select', () => {

    it.only('should increment the popularity of the node', () => {
      trie.populate(['pize', 'pizza', 'pizzaria'])
      trie.select('pizzaria')
      const expectation = trie.suggest('pi')

      assert.equal(expectation[0], 'pizzaria')
    })
  })
})



