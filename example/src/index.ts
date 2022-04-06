import {
  GOOGLE_PROJECT_ID,
  GOOGLE_APPLICATION_CREDENTIALS,
  PLUGGY_BANK_CREDENTIALS, 
  PLUGGY_BANK_CONNECTOR 
} from './utils'

import moment from 'moment'

const pluggy = require('pluggy-sdk');
const client = new pluggy.PluggyClient({
  clientId: 'de408b77-8f12-47ca-a6a5-dcf410a571ce',
  clientSecret: 'f6c27fac-109a-46d3-a5ea-55f0aecefc8c',
});

'use strict';

function main() {
  const {BigQuery} = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  function queryItems() {
    const options = {
      query: "SELECT * FROM \`pfm-mvp.dataset.items\` WHERE id = '5eb797f2-ed7b-4694-8752-98b4eb5d35c0'"
    };

    bigquery.createQueryJob(options).then((job) => {
      const items = job.getQueryResults();
    
      items.forEach(item => {
        console.log(`Recuperando contas do ${item.name}...`);

        client.fetchAccounts(item.id).then((accounts) => {
          accounts.results.forEach(account => {
            //insertAccount(account, item.id);

            var qTrans = "";
            client.fetchTransactions(account.id).then((transactions) => {
              transactions.results.forEach(transaction => {
                qTrans += `INSERT INTO dataset.transactions(id, description, descriptionRaw, currencyCode, amount, date, category, balance, accountId, providerCode, status, paymentData, type)
                          VALUES("${transaction.id}", "${transaction.description}", "${transaction.descriptionRaw}", "${transaction.currencyCode}", ${transaction.amount}, ${moment(transaction.date).format('YYYY-MM-DD')}, "${transaction.category}", ${transaction.balance}, "${account.id}", "${transaction.providerCode}", "${transaction.status}", "${transaction.paymentData}", "${transaction.type}"); `;
              })  
          
              insertTransaction(qTrans);
            })
          })
        });
      });
    })
  }

    function insertAccount(account, itemId) {
      console.log(`Gravando dados da ${account.name}...`);

      bigquery.createQueryJob({
        query: `INSERT INTO dataset.accounts(id, type, subtype, name, balance, currencyCode, itemId, number, marketingName, taxNumber, owner)
          VALUES("${account.id}", "${account.type}", "${account.subtype}", "${account.name}", ${account.balance}, "${account.currencyCode}", "${itemId}", "${account.number}", "${account.marketingName}", "${account.taxNumber}", "${account.owner}")`
      })
    }

    function insertTransaction(q) {
      console.log(`Gravando transações...${q}`);

      bigquery.createQueryJob({
        query: q
      })

      //, descriptionRaw, currencyCode, amount, date, category, balance, accountId, providerCode, status, paymentData, type
      //, "${transaction.descriptionRaw}", "${transaction.currencyCode}", ${transaction.amount}, ${moment(transaction.date).format('YYYY-MM-DD')}, "${transaction.category}", ${transaction.balance}, "${accountId}", "${transaction.providerCode}", "${transaction.status}", "${transaction.paymentData}", "${transaction.type}"
    }
      
  queryItems();
}  

main();