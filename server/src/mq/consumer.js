const amqp = require('amqplib')
const Notification = require('../models/notification.model')

const consume = async () => {
    try {
        const connection = await amqp.connect(process.env.AMQP_URI)
        const channel = await connection.createChannel()

        const queueName = 'push-subcribers-noti'

        await channel.assertQueue(queueName, {
            durable: true
        })

        channel.consume(queueName, (message) => {
            // console.log(`recevie::${message.content.toString()}`)
            const data = JSON.parse(message.content.toString())
            if (data.type === "publish"){
                if (!data.followers.includes(data.senderId)){
                    data.followers.forEach(async (receiverId) => {
                       await Notification.create({
                        type: 'publish',
                        sender: data.senderId,
                        receiver: receiverId,
                        post: data.postId
                      })
                    })
                  }
            } else if(data.type === "schedule"){
                if (!data.followers.includes(data.senderId)){
                    data.followers.forEach(async (receiverId) => {
                       await Notification.create({
                        type: 'schedule',
                        sender: data.senderId,
                        receiver: receiverId,
                        At: new Date(data.At)
                      })
                    })
                  }
            }
        }, {
            noAck: true
        })

        // await channel.close()
        // await connection.close()
    } catch (error) {
        console.log(error)
    }
}

// consume().catch(console.error)
module.exports = consume