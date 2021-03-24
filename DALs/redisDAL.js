const rsmqDS = require('../DataSource/RSMQ')


const checkIfQueueExists = function(q_id)
{
  console.log('checkIfQueueExists')
  return new Promise((resolve, reject) =>
  { 
    rsmqDS.rsmq.listQueues(function (err, queues) {
      if (err) {
        reject(err)
      }
      else{
        console.log(queues)
        resolve(queues.includes(q_id))
      }});
  })
}

const createQ = function(q_id)
{
  console.log('createQ')
  return new Promise((resolve, reject) =>
  {
    rsmqDS.rsmq.createQueue({ qname: q_id }, function (err, resp) {
      if (err) {
        reject(err)
      }
      else{
        console.log('Q created')
        resolve(resp)
      }})
  })
}

const sendMsgToRedis = function(q_id, msg)
{
  console.log('sendMsgToRedis')
  return new Promise((resolve, reject) =>
  {
    rsmqDS.rsmq.sendMessage({ qname: q_id, message: msg.msg}, function (err, resp) {
      if (err) {
        reject(err)
      }
      else{
        console.log("Message sent. ID:", resp);
        resolve(resp)
      }});
  })
}

const getMsgFromRedis = function(q_id)
{
  console.log('getMsgFromRedis')
  return new Promise((resolve, reject) =>
  {
    rsmqDS.rsmq.receiveMessage({ qname: q_id }, function (err, resp) {
      if (err) {
        reject(err)
      }
    else{
      console.log("Message received.", resp)
      resolve(resp)
    }})
})
}


module.exports  =  {sendMsgToRedis, createQ, checkIfQueueExists, getMsgFromRedis}