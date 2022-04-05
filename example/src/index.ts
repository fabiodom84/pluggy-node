import {
  GOOGLE_PROJECT_ID,
  GOOGLE_APPLICATION_CREDENTIALS,
  PLUGGY_BANK_CREDENTIALS, 
  PLUGGY_BANK_CONNECTOR 
} from './utils'

'use strict';

function main() {
  // [START bigquery_query]
  // [START bigquery_client_default_credentials]
  // Import the Google Cloud client library using default credentials
  const {BigQuery} = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();
  // [END bigquery_client_default_credentials]
  async function query() {
    // Queries the U.S. given names dataset for the state of Texas.

    const query = "SELECT * FROM \`pfm-mvp.dataset.accounts\`";

    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: query//,
      // Location must match that of the dataset(s) referenced in the query.
      //location: 'US',
    };

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    //console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    // Print the results
    //console.log('Rows:');
    rows.forEach(row => console.log(row));
  }
  // [END bigquery_query]
  query();
}

main();




/*const pluggy = require('pluggy-sdk');
const client = new pluggy.PluggyClient({
  clientId: 'de408b77-8f12-47ca-a6a5-dcf410a571ce',
  clientSecret: 'f6c27fac-109a-46d3-a5ea-55f0aecefc8c',
});

client
  .fetchItem('5eb797f2-ed7b-4694-8752-98b4eb5d35c0')
  .then((item) => {
    console.log(item);
  });

/*client
  .fetchIdentityByItemId('5eb797f2-ed7b-4694-8752-98b4eb5d35c0')
  .then((identity) => {
    console.log(identity);
  });*/

/*client
  .fetchAccounts('5eb797f2-ed7b-4694-8752-98b4eb5d35c0')
  .then(({ results: accounts }) => {
    console.log(accounts);
  });*/

/*client
  .fetchTransactions('109611a1-4d6c-4f42-8b59-994cdc7dbb13')
  .then(({results: transactions}) => {
    console.log(transactions);
  });*/

/*import dotenv from 'dotenv'
import moment from 'moment'
import { PluggyClient } from 'pluggy-sdk'

import {
  sleep,

  PLUGGY_BANK_CREDENTIALS,
  PLUGGY_BANK_CONNECTOR as PLUGGY_BANK_CONNECTOR_ID,
} from './utils'

dotenv.config()

void (async function(): Promise<void> {
  const { CLIENT_ID = '', CLIENT_SECRET = '' } = process.env

  const client = new PluggyClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    baseUrl: process.env.URL,
  })

  // Review connectors endpoint
  const response = await client.fetchConnectors({
    sandbox: true,
  })
  console.log('We support the following connectors: ')
  response.results.forEach(connector => {
    console.log(`(# ${connector.id} ) - ${connector.name}`)
  })

  // View credentials
  const connector = await client.fetchConnector(PLUGGY_BANK_CONNECTOR_ID)
  console.log(`We are going to connect with ${connector.name}`)

  console.log('We will send the parameters that are OK.')
  console.log(PLUGGY_BANK_CREDENTIALS)

  // Validate connector parameters
  const validation = await client.validateParameters(
    PLUGGY_BANK_CONNECTOR_ID,
    PLUGGY_BANK_CREDENTIALS
  )
  console.log(`Connector parameter validation: `, validation)

  // Create a connection
  let item = await client.createItem(PLUGGY_BANK_CONNECTOR_ID, PLUGGY_BANK_CREDENTIALS)

  while (!['LOGIN_ERROR', 'OUTDATED', 'UPDATED'].includes(item.status)) {
    console.log(`Item ${item.id} is syncing with the institution`)
    await sleep(3000)
    item = await client.fetchItem(item.id)
  }

  console.log(`Item completed execution with status ${item.status}`)

  if (['LOGIN_ERROR', 'OUTDATED'].includes(item.status)) return

  console.log(`Retrieving accounts for item # ${item.id}`)

  const accounts = await client.fetchAccounts(item.id)
  for (let i = 0; i < accounts.results.length; i++) {
    const account = accounts.results[i]
    console.log(
      `Account # ${account.id} has a balance of ${account.balance}, its number is ${account.number}`
    )
    const transactions = await client.fetchTransactions(account.id)
    transactions.results.forEach(tx => {
      console.log(
        `Transaction # ${tx.id} made at ${moment(tx.date).format('DD/MM/YYYY')}, description: ${
          tx.description
        }, amount: ${tx.amount}`
      )
    })
  }

  console.log(`Retrieving identity for item # ${item.id}`)
  const identity = await client.fetchIdentityByItemId(item.id)
  console.log(`Identity of the account name is ${identity.document}`)

  console.log(`Deleting retrieved data for item #${item.id}`)
  await client.deleteItem(item.id)
  console.log(`Item deleted succesfully`)
})()*/
