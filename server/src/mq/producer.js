const amqp = require('amqplib')

const produce = async (message) => {
    try {
        const connection = await amqp.connect(process.env.AMQP_URI)
        const channel = await connection.createChannel()

        const queueName = 'push-subcribers-noti'

         await channel.assertQueue(queueName, {
            durable: true
        })

        const jsonString = JSON.stringify(message);
         channel.sendToQueue(queueName, Buffer.from(jsonString))
        //  console.log(`message sent::${message}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = produce