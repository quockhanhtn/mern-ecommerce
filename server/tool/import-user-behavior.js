/* cSpell:disable */
import axios from 'axios';
import userBehaviorService from '../src/services/user-behavior.service.js';
import SlackUtils from '../src/utils/SlackUtils.js';

const DATSET_NAME = 'UserBehaviorDataset';
const REQ_CONFIG = { headers: { Authorization: "a3fa7034b71ae0741665767fd902193e" } };
const REQ_URL = `https://recom.fpt.vn/api/v0.1/recommendation/dataset/${DATSET_NAME}/`;
const METHOD_OVERWRITE = `overwrite`;
const METHOD_APPEND = `append`;


export async function importUserBehaviorToFpt() {
  console.log('Loading data from db ...');
  let list = await userBehaviorService.getDataWithCalculateScore();
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
    } catch (error) {
      console.log(`${data.id} false ${error.message}`);
    }
  }

  SlackUtils.sendMessage('Import user behavior to FPT done at ' + new Date().toLocaleString());
}

//importDataToFpt();