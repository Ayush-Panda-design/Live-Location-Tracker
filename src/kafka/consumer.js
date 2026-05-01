const kafka = require('./kafka');
const Location = require('../models/Location');

const socketConsumer = kafka.consumer({ groupId: 'socket-broadcast-group' });
const dbConsumer = kafka.consumer({ groupId: 'db-persistence-group' });

const startConsumers = async (io) => {
  await socketConsumer.connect();
  await dbConsumer.connect();

  await socketConsumer.subscribe({ topic: 'location-updates', fromBeginning: false });
  await dbConsumer.subscribe({ topic: 'location-updates', fromBeginning: false });

  // Socket Consumer
  await socketConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      // Broadcast to all other connected clients
      io.emit('location-update', data);
    },
  });

  // Database Consumer
  await dbConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        // Save location to MongoDB
        await Location.create({
          userId: data.userId,
          lat: data.lat,
          lng: data.lng,
          timestamp: data.timestamp || Date.now()
        });
      } catch (error) {
        console.error('Error saving location to DB', error);
      }
    },
  });

  console.log('Kafka Consumers connected');
};

module.exports = { startConsumers };
