const ChatMessage = require('../Model/chatMessage');
const Builder = require('../Model/Builder');
const Client = require('../Model/Client');

const chatController = {
  getMessages: async (req, res) => {
    try {
      const { senderId, receiverId } = req.query;
      const messages = await ChatMessage.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId }
        ]
      })
        .sort({ timestamp: 1 })
        .populate('sender', 'firstName lastName businessname')
        .populate('receiver', 'firstName lastName businessname');

      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllBuildersForChat: async (req, res) => {
    try {
      const builders = await Builder.find({}, 'firstName lastName businessname image');
      res.json(builders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getBuilderClients: async (req, res) => {
    try {
      const { builderId } = req.params;

      // Find all messages where this builder is involved
      const messages = await ChatMessage.find({
        $or: [
          { sender: builderId, senderModel: 'Builder' },
          { receiver: builderId, receiverModel: 'Builder' }
        ]
      })
        .populate('sender', 'firstName lastName')
        .populate('receiver', 'firstName lastName')
        .sort({ timestamp: -1 });

      // Extract unique clients
      const clientsMap = new Map();

      messages.forEach(msg => {
        const client = msg.senderModel === 'Client' ? msg.sender : msg.receiver;
        if (!clientsMap.has(client._id.toString())) {
          clientsMap.set(client._id.toString(), {
            _id: client._id,
            name: `${client.firstName} ${client.lastName}`,
            lastMessage: msg.message,
            timestamp: msg.timestamp
          });
        }
      });

      res.json(Array.from(clientsMap.values()));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  sendMessage: async (req, res) => {
    try {
      const { sender, senderModel, receiver, message } = req.body;

      const newMessage = new ChatMessage({
        sender,
        senderModel,
        receiver,
        receiverModel: senderModel === 'Client' ? 'Builder' : 'Client',
        message
      });

      const savedMessage = await newMessage.save();

      const populatedMessage = await ChatMessage.findById(savedMessage._id)
        .populate('sender', 'firstName lastName businessname')
        .populate('receiver', 'firstName lastName businessname');

      res.status(201).json(populatedMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getUserChats: async (req, res) => {
    try {
      const { userId, userType } = req.params;

      let query = {
        $or: [
          { sender: userId, senderModel: userType },
          { receiver: userId, receiverModel: userType }
        ]
      };

      const chats = await ChatMessage.find(query)
        .populate('sender', 'firstName lastName businessname')
        .populate('receiver', 'firstName lastName businessname')
        .sort({ timestamp: -1 });

      // Get unique users from chats
      const uniqueUsers = new Map();

      chats.forEach(chat => {
        const partner = chat.senderModel === userType ? chat.receiver : chat.sender;
        if (!uniqueUsers.has(partner._id.toString())) {
          uniqueUsers.set(partner._id.toString(), {
            partnerId: partner._id,
            partnerName: partner.businessname || `${partner.firstName} ${partner.lastName}`,
            lastMessage: chat.message,
            timestamp: chat.timestamp
          });
        }
      });

      res.json(Array.from(uniqueUsers.values()));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getBuilderClients: async (req, res) => {
    try {
        const { builderId } = req.params;

        // Find messages where clients have messaged this builder
        const messages = await ChatMessage.find({
            $or: [
                // Include messages where client is sender and builder is receiver
                { receiver: builderId, receiverModel: 'Builder', senderModel: 'Client' },
                // Include messages where builder is sender and client is receiver
                { sender: builderId, senderModel: 'Builder', receiverModel: 'Client' }
            ]
        })
        .populate('sender', 'firstName lastName')
        .populate('receiver', 'firstName lastName')
        .sort({ timestamp: -1 });

        // Extract unique clients who have messaged
        const clientsMap = new Map();

        messages.forEach(msg => {
            // Get the client from the message (whether they're sender or receiver)
            const client = msg.senderModel === 'Client' ? msg.sender : msg.receiver;
            
            if (!clientsMap.has(client._id.toString())) {
                clientsMap.set(client._id.toString(), {
                    _id: client._id,
                    name: `${client.firstName} ${client.lastName}`,
                    lastMessage: msg.message,
                    timestamp: msg.timestamp,
                    isMessageContact: true
                });
            }
        });

        res.json(Array.from(clientsMap.values()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

};

module.exports = chatController; 
