const fs = require('fs');

const kafka = new Kafka({
  clientId: 'live-location-tracker',
  brokers: [process.env.KAFKA_BROKER],

  ssl: {
    rejectUnauthorized: true,
    ca: [process.env.KAFKA_CA_CERT],
  },

  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});
