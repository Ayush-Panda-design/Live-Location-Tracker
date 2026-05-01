const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'live-location-tracker',

  brokers: [process.env.KAFKA_BROKER],

  // 🔴 REQUIRED for Aiven (reject self-signed cert errors)
  ssl: {
    rejectUnauthorized: false
  },

  sasl: {
    mechanism: 'scram-sha-256',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

module.exports = kafka;
