const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'live-location-tracker',
  brokers: [process.env.KAFKA_BROKER || 'localhost:29092']
});

module.exports = kafka;
