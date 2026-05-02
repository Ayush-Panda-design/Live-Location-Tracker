const fs = require('fs');
const { Kafka } = require('kafkajs'); 
const kafka = new Kafka({
  clientId: 'live-location-tracker',
  brokers: [process.env.KAFKA_BROKER],

ssl: {
  rejectUnauthorized: true,
  ca: process.env.KAFKA_CA_CERT?.replace(/\\n/g, '\n'),
},

  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

module.exports = kafka;
