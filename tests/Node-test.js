const chai = require('chai');
const assert = chai.assert
const Node = require('../scripts/Node');

describe('Node',() => {

  let node;
  beforeEach(()=> {
     node = new Node()  
  })

  it('should be an Object',() => {
    assert.isObject(node);
    })

  it('should have a property of data set to null', () => {
    assert.equal(node.data, null);
  })

  it('should have a property of children set to an empty object', () => {
    assert.deepEqual(node.children, {});
  })

  it('should have a property of complete set to false', () => {
    assert.equal(node.complete, false)
  })

  it('should have a property of popularity set to zero', () => {
    assert.equal(node.popularity, 0)
  })
})