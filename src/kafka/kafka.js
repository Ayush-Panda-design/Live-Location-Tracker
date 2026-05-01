/*const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'live-location-tracker',
  brokers: [process.env.KAFKA_BROKER]
});

module.exports = kafka;*/

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'live-location-tracker',

  brokers: [process.env.KAFKA_BROKER],

  // 🔴 REQUIRED for Aiven
  ssl: true,

  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

module.exports = kafka;
