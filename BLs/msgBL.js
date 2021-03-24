const redisDAL = require('../DALs/redisDAL');

const getNextMsg = async function(id)
{
    console.log('getNextMsg')
    let isExists = await redisDAL.checkIfQueueExists(id)
    if(isExists)
    {
        resOfSend = await redisDAL.getMsgFromRedis(id)
        if(resOfSend.id)
            return resOfSend
        else
            return 204
    }
    else
    {
        return 204
    }
}

const addMsg = async function(id, obj)
{
    let resOfSend
    let isExists = await redisDAL.checkIfQueueExists(id)
    if(isExists)
    {
        resOfSend = await redisDAL.sendMsgToRedis(id, obj)
    }
    else
    {
        let resOfCreateQ = await redisDAL.createQ(id)
        console.log(resOfCreateQ)
        if(resOfCreateQ == 1)
        {
        resOfSend = await redisDAL.sendMsgToRedis(id, obj)
        }
    }
    console.log(resOfSend)
    return resOfSend
}

module.exports = {getNextMsg, addMsg}