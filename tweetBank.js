// lodash, like underscore, is a utility library
var _ = require('lodash');

var data = [];

function add (name, text) {
  data.push({ name: name, text: text, id: (data.length).toString() });
};

function list () {
  return _.cloneDeep(data);
};

function find (properties) {
  return _.where(data, properties);
};

module.exports = {
  add: add,
  list: list,
  find: find
};

// ----------------------------------------------
// generate fake tweets ("seeding" our data store)

function randArrayEl (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

function getFakeName () {
  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob', 'Ethan', 'Sophia', 'Emma', 'Madison'];
  var fakeLasts = ['Alley', 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
  return randArrayEl(fakeFirsts) + ' ' + randArrayEl(fakeLasts);
};

function getFakeTweet () {
  var awesome_adj = ['awesome', 'breathtaking', 'amazing', 'sexy', 'sweet', 'cool', 'wonderful', 'mindblowing'];
  return 'Fullstack Academy is ' + randArrayEl(awesome_adj) + '! The instructors are just so ' + randArrayEl(awesome_adj) + '. #fullstacklove #codedreams';
};

for(var i=0; i<10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}

// console.log(data);
