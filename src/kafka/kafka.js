const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'live-location-tracker',
  brokers: [process.env.KAFKA_BROKER]
});

module.exports = kafka;
