const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    totalPhotos: Int!
  }

  type Mutation {
    postPhoto(name: String! description: String): Boolean!
  }
`;

// 1. 메모리에 사진을 저장할 때 사용할 데이터 타입
var photos = [];

const resolvers = {
  Query: {
    // 2. 사진 배열의 길이를 반환한다.
    totalPhotos: () => photos.length,
  },

  // 3. Mutation & postPhoto 리졸버 함수
  Mutation: {
    postPhoto(parent, args) {
      photos.push(args);
      return true;
    },
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
