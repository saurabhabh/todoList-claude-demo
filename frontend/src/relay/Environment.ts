import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const HTTP_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5232/graphql';

async function fetchGraphQL(text: string, variables: any) {
  const response = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return await response.json();
}

function fetchRelay(params: any, variables: any) {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
  return fetchGraphQL(params.text, variables);
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});