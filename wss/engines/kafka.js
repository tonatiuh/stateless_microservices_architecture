// const Redis = require('ioredis');
const kafka = require('kafka-node');
const nconf   = require('nconf');

module.exports.init = function () {
  this.kafkaTopic  = nconf.get('engines:kafka:topic');
  this.kafkaServer = nconf.get('engines:kafka:server');
  this.producer = createProducer();
  this.consumer = createConsumer();

  this.producer.on('error', function (err) {
    console.log(err);
    console.log('[kafka-producer -> ' + this.kafkaTopic + ']: connection failed');
    throw err;
  });

  this.consumer.on('message', consume)
  this.consumer.on('error', err => {
    console.log('error', err);
  });
};

const createProducer = () => {
  const Producer = kafka.Producer;
  const client   = new kafka.KafkaClient(this.kafkaServer);
  const producer = new Producer(client);

  return producer;
};

const createConsumer = () => {
  const Consumer = kafka.Consumer;
  const client   = new kafka.KafkaClient(this.kafkaServer);
  const consumer = new Consumer(
    client,
    [{
      topic: this.kafkaTopic,
      partition: 0,
    }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );

  return consumer;
};

module.exports.produce = data => {
  const payload = { messages: encode(data), topic: this.kafkaTopic };

  this.producer.send([payload], (err, data) => {
    if (err) {
      console.log('[kafka-producer -> ' + this.kafkaTopic + ']: broker update failed');
    } else {
      console.log('[kafka-producer -> ' + this.kafkaTopic + ']: broker update success');
      console.log('[kafka-producer -> data: ', data);
    }
  });
};

const consume = async message => {
  const WSPool = require('../managers/wsPool');


  Object.keys(WSPool.clients).forEach(socketId =>
    WSPool.clients[socketId].socket.emit('action', decode(message.value))
  );

  console.log(
    'kafka-consumer -> message:',
    decode(message.value)
  );
};

function encode(data) {
  return JSON.stringify(data)
}

function decode(encoded) {
  return JSON.parse(encoded);
}
