const { ApolloServer } = require('apollo-server');

const typeDefs = `
  # 1. Photo 타입 정의를 추가한다.
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }

  # 2. allPhotos에서 Photo 타입을 반환한다.
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  # 3. 뮤테이션에서 새로 게시된 사진을 반환한다.
  type Mutation {
    postPhoto(name: String! description: String): Photo!
  }
`;

// 1. 고유 ID를 만들기 위해 값을 하나씩 증가시킨 변수이다.
var _id = 0;
var photos = [];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },

  Mutation: {
    postPhoto(parent, args) {
      // 2. 새로운 사진을 만들고 id 부여한다.
      var newPhoto = {
        id: _id++,
        ...args,
      };
      photos.push(newPhoto);

      return newPhoto;
    },
  },

  Photo: {
    url: parant => `http://localhost.com/img/${parant.id}.jpg`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4. 웹 서버를 구동하기 위해 listen 메소드를 호출한다.
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
