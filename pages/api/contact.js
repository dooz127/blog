import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage = {
      email,
      name,
      message
    };

    const DB_CONNECTION_STRING = process.env.DB_HOST.replace(
      '<username>',
      process.env.DB_USER
    ).replace('<password>', process.env.DB_PASS);

    let client;

    try {
      client = await MongoClient.connect(DB_CONNECTION_STRING);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res.status(201).json({ message: 'Succesfully sent message!', newMessage });
  }
};

export default handler;
