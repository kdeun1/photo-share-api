const { ApolloServer } = require('apollo-server');

// 1. apollo-server를 불러온다.
const typeDefs = `
  type Query {
    totalPhotos: Int!
  }
`;

const resolvers = {
  Query: {
    totalPhotos: () => 42,
  },
};

// 2. 서버 인스턴스를 새로 생성한다.

// 3. typeDefs(스키마)와 리졸버를 객체에 넣어 전달한다.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4. 웹 서버를 구동하기 위해 listen 메소드를 호출한다.
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
