/*const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'live-location-tracker',
  brokers: [process.env.KAFKA_BROKER]
});

module.exports = kafka;*/

const { Kafka } = require('kafkajs');
const fs = require('fs');

const kafka = new Kafka({
  clientId: 'live-location-tracker',
  brokers: [process.env.KAFKA_BROKER],

  ssl: {
    rejectUnauthorized: false, // 🔥 FIX FOR RENDER / NODE SSL ISSUE
  },

  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

module.exports = kafka;
