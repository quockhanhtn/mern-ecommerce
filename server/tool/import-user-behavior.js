/* cSpell:disable */
import axios from 'axios';
import fs from 'fs';
//import mongoose from 'mongoose';
import { sendMail } from '../src/services/mailer.service.js';

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('Connected to database ' + process.env.MONGO_URI);
//     importDataToFpt();
//   })
//   .catch(err => console.log('Connect to MongoDB failed', err));

const DATSET_NAME = 'UserBehaviorDataset';
const REQ_CONFIG = { headers: { Authorization: "a3fa7034b71ae0741665767fd902193e" } };
const REQ_URL = `https://recom.fpt.vn/api/v0.1/recommendation/dataset/${DATSET_NAME}/`;
const METHOD_OVERWRITE = `overwrite`;
const METHOD_APPEND = `append`;


export async function importDataToFpt() {
  console.log('Loading data from db ...');
  let list = [{
    userData: 'u000001',
    productId: 'd00002',
    score: 5.2
  },
  {
    userData: 'u000001',
    productId: 'd00003',
    score: 100.5
  }
];
  console.log(`Loaded ${list.length} items from db !`);

  console.log('Clearing old data ...');
  let isOverwrited = false;
  while (!isOverwrited) {
    try {
      await axios.post(REQ_URL + METHOD_OVERWRITE, [list[0]], REQ_CONFIG);
      isOverwrited = true;
    } catch (err) {
      console.log(`Error: ${err}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  console.log('Clearing old data done');

  for (let i = list.length - 1; i > 0; i--) {
    const data = list[i];
    try {
      await axios.post(REQ_URL + METHOD_APPEND, [data], REQ_CONFIG);
      console.log(`${data.id} done`);
    } catch (error) {
      console.log(`${data.id} false ${error.message}`);
    }
  }

  sendMail(
    ['quockhanhdev@gmail.com', 'hoangho1147@gmail.com'],
    'Import new data to fpt recom',
    'Import new data to fpt recom',
    `Imported 0 product(s) to fpt recom from0 to ${new Date().toLocaleString()}`
  );
}

importDataToFpt();