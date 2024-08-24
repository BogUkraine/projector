require('dotenv').config()
const axios = require('axios');
const uuid = require('uuid');

const MEASUREMENT_ID = process.env.MEASUREMENT_ID
const API_SECRET = process.env.API_SECRET
const EVENT_NAME = 'EVENT_EXCHANGE_RATE'
const CURRENCY_FROM = 'UAH'
const CURRENCY_TO = 'USD'
const PUSH_INTERVAL_MS = 10000 // it could be 1 hour as per requirements
const GA_URL = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`

const getCurrenciesList = async (from, to) => {
  try {
    const currenciesList = (await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'))?.data
    if (!currenciesList.length) throw Error("Empty response");

    const item = currenciesList.find((item) => {
      return item.cc === to
    })
    if (!item) throw Error("Empty response");

    return {
      from,
      to,
      exchangeRate: item.rate
    }
  } catch (err) {
    console.error(error)
    return {
      from,
      to,
      exchangeRate: 'No information' 
    }
  }
}

const sendEvent = async () => {
  const { from, to, exchangeRate } = await getCurrenciesList(CURRENCY_FROM, CURRENCY_TO);

  const data = await axios.post(GA_URL, {
    client_id: uuid.v4(),
    events: [{
      name: EVENT_NAME,
      params: {
        from,
        to,
        exchangeRate
      },
    }]
  });

  console.log('Sent: ', exchangeRate, ' for FROM: ', from, ' to TO: ', to)
}

(() => {
  console.log('Worker started. Pushing info to Google Analytics 4 every ', PUSH_INTERVAL_MS, ' ms');

  setInterval(() => {
    sendEvent();
  }, PUSH_INTERVAL_MS);
})();