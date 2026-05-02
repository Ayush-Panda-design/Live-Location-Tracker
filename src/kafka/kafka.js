const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'live-location-tracker',
  brokers: [process.env.KAFKA_BROKER],

  ssl: true,

  sasl: {
    mechanism: 'plain',   // Aiven uses "plain"
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

module.exports = kafka;
