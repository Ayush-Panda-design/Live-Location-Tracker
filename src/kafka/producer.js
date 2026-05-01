const kafka = require('./kafka');

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

const sendLocationUpdate = async (locationData) => {
  try {
    await producer.send({
      topic: 'location-updates',
      messages: [
        { value: JSON.stringify(locationData) }
      ]
    });
  } catch (error) {
    console.error('Error sending message to Kafka', error);
  }
};

module.exports = { connectProducer, sendLocationUpdate };
