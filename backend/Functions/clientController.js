const Client = require('../Model/Client');
const bcrypt = require('bcrypt');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const updateClientImage = async (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: 'Error uploading file', error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { clientId } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    try {
      const updatedClient = await Client.findByIdAndUpdate(
        clientId,
        { image: imagePath },
        { new: true }
      );

      if (!updatedClient) {
        return res.status(404).json({ message: 'Client not found' });
      }

      res.status(200).json({ message: 'Image updated successfully', imageUrl: imagePath });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Error updating image', error: error.message });
    }
  });
};

const removeClientImage = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    if (client.image) {
      const filePath = path.join(__dirname, '..', client.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    client.image = '';
    await client.save();

    res.status(200).json({ message: 'Image removed successfully' });
  } catch (error) {
    console.error('Error removing image:', error);
    res.status(500).json({ message: 'Error removing image', error: error.message });
  }
};

// Client registration (signup) function
const ClientController = async (req, res) => {
  const { firstName, lastName, email, password, phoneno ,city ,role} = req.body;
  try {
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = new Client({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneno,
      city,
      role
    });
    await newClient.save();
    res.status(201).json({ message: 'Client registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong in client', error });
  }
};


// Client login function
const loginClient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', client /* token: token if using JWT */ });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong during login', error });
  }
};


// Get all Clients
const getAllClients = async (req, res) => {
  try {
    const Clients = await Client.find(); 
    res.status(200).json(Clients); 
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
const getMessages = async (room) => {
  try {
    const messages = await ChatMessage.find({ room }).sort({ timestamp: 1 });
    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};


const updateClient = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneno, city } = req.body;
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phoneno, city },
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client updated successfully', client: updatedClient });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};


const changeClientPassword = async (req, res) => {
  const { clientId, currentPassword, newPassword } = req.body;

  try {
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, client.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    client.password = hashedNewPassword;
    await client.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


module.exports = {
  ClientController, loginClient ,getAllClients ,getMessages ,updateClient ,changeClientPassword ,deleteClient ,removeClientImage ,updateClientImage
};
