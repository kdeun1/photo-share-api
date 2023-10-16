const { ApolloServer } = require('apollo-server');

const typeDefs = `
  enum PhotoCategory {
    SELFIE
    PRTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }

  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory
    postedBy: User!
    taggedUsers: [User!]!
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  input PostPhotoInput {
    name: String!
    category: PhotoCategory=PORTRAIT
    description: String
  }

  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
  }

  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
    inPhotos: [Photo!]!
  }
`;

var _id = 0;
var photos = [
  {
    id: '1',
    name: 'name1',
    description: 'desc1',
    category: 'ACTION',
    githubLogin: 'mHattrup1',
  },
  {
    id: '2',
    name: 'name2',
    description: 'desc2',
    category: 'SELFIE',
    githubLogin: 'mHattrup3',
  },
  {
    id: '3',
    name: 'name3',
    description: 'desc3',
    category: 'LANDSCAPE',
    githubLogin: 'mHattrup2',
  },
];
var users = [
  {
    githubLogin: 'mHattrup1',
    name: 'Mike Hattrup1',
  },
  {
    githubLogin: 'mHattrup2',
    name: 'Mike Hattrup2',
  },
  {
    githubLogin: 'mHattrup3',
    name: 'Mike Hattrup3',
  },
];
var tags = [
  {
    photoID: '1',
    userID: 'mHattrup2',
  },
  {
    photoID: '2',
    userID: 'mHattrup2',
  },
  {
    photoID: '2',
    userID: 'mHattrup1',
  },
  {
    photoID: '2',
    userID: 'mHattrup3',
  },
];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },

  Mutation: {
    postPhoto(parent, args) {
      var newPhoto = {
        id: _id++,
        ...args.input,
      };
      photos.push(newPhoto);

      return newPhoto;
    },
  },

  Photo: {
    url: parant => `http://localhost.com/img/${parant.id}.jpg`,
    postedBy: parent => {
      return users.find(u => u.githubLogin === parent.githubLogin);
    },
    taggedUsers: parent => {
      return tags
        .filter(tag => tag.photoID === parent.id)
        .map(tag => tag.userID)
        .map(userId => users.find(u => u.githubLogin === userId));
    },
  },

  User: {
    postedPhotos: parent => {
      return photos.filter(p => p.githubLogin === parent.githubLogin);
    },
    inPhotos: parent => {
      return tags
        .filter(tag => tag.userID === parent.id)
        .map(tag => tag.photoID)
        .map(photoId => photos.find(p => p.id === photoId));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
