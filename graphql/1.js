const gql = require('nanographql');

const query = gql`
  query {
    hello
  }
`;

async function fn() {
  try {
    const res = await fetch('http://localhost:4000/graphql', {
      body: query(),
      method: 'POST',
    });
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

fn();
