import Faker from 'faker';

import Connection from './Connection';
import DBPerson from './model/DBPerson';
import DBPost from './model/DBPost';

// relations
DBPerson.hasMany(DBPost);
DBPost.belongsTo(DBPerson);

// fake data
/*
Connection.sync({ force: true }).then(() => {
  new Array(10).fill(0).forEach(() => Person.create({
    firstName: Faker.name.firstName(),
    lastName: Faker.name.lastName(),
    email: Faker.internet.email(),
  }).then(person => person.createPost({
    title: `Sample post by ${person.firstName}`,
    content: 'here is some content',
  })));
});
*/

Connection.sync();

export default Connection;
export { DBPerson, DBPost };
