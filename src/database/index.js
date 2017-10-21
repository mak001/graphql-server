import Faker from 'faker';

import Connection from './Connection';
import DBUser from './model/DBUser';
import DBPost from './model/DBPost';

// relations
DBUser.hasMany(DBPost);
DBPost.belongsTo(DBUser);

// fake data
/*
Connection.sync({ force: true }).then(() => {
  new Array(10).fill(0).forEach(() => User.create({
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
export { DBUser, DBPost };
