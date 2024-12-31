const Builder = require('../Model/Builder');
const BuilderResponse = require('../Model/BuilderResponse');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
// Multer configuration for cards

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const updateBuilderImage = async (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: 'Error uploading file', error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { builderId } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    try {
      const updatedBuilder = await Builder.findByIdAndUpdate(
        builderId,
        { image: imagePath },
        { new: true }
      );

      if (!updatedBuilder) {
        return res.status(404).json({ message: 'Builder not found' });
      }

      res.status(200).json({ message: 'Image updated successfully', imageUrl: imagePath });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Error updating image', error: error.message });
    }
  });
};

const removeBuilderImage = async (req, res) => {
  const { id } = req.params;

  try {
    const builder = await Builder.findById(id);
    if (!builder) {
      return res.status(404).json({ message: 'Builder not found' });
    }

    if (builder.image) {
      const filePath = path.join(__dirname, '..', builder.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    builder.image = '';
    await builder.save();

    res.status(200).json({ message: 'Image removed successfully' });
  } catch (error) {
    console.error('Error removing image:', error);
    res.status(500).json({ message: 'Error removing image', error: error.message });
  }
};


const builderController = async (req, res) => {
  const { firstName, lastName, email, password, phoneno, businessname, cnic , city ,role} = req.body;
  try {
    // Check if builder already exists with the given email
    const existingBuilder = await Builder.findOne({ email });
    if (existingBuilder) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newBuilder = new Builder({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneno,
      businessname,
      cnic,
      city,
      role
    });
    await newBuilder.save();
    res.status(201).json({ message: 'Builder registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Login function
const loginBuilder = async (req, res) => {
    const { email, password } = req.body;
    try {
      const builder = await Builder.findOne({ email });
      if (!builder) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, builder.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Login successful', builder /* token: token if using JWT */ });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get all builders
const getAllBuilders = async (req, res) => {
  try {
    const builders = await Builder.find(); // Get all builders from the database
    res.status(200).json(builders); // Send builders as response
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};


const getCompletedProjectsForBuilder = async (req, res) => {
  const { builderId } = req.params;
  try {
    const completedProjects = await BuilderResponse.find({
      builderId: builderId,
      status: 'Complete'
    }).populate('projectId');
    
    res.status(200).json(completedProjects); 
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const updateBuilder = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneno } = req.body;
  try {
    const updatedBuilder = await Builder.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phoneno },
      { new: true }
    );
    if (!updatedBuilder) {
      return res.status(404).json({ message: 'Builder not found' });
    }
    res.status(200).json({ message: 'Builder updated successfully', builder: updatedBuilder });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};


const changeBuilderPassword = async (req, res) => {
  const { builderId, currentPassword, newPassword } = req.body;

  try {
    const builder = await Builder.findById(builderId);
    if (!builder) {
      return res.status(404).json({ message: 'Builder not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, builder.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    builder.password = hashedNewPassword;
    await builder.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
 

const deleteBuilder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBuilder = await Builder.findByIdAndDelete(id);
    if (!deletedBuilder) {
      return res.status(404).json({ message: 'Builder not found' });
    }
    res.status(200).json({ message: 'Builder deleted successfully' });
  } catch (error) {
    console.error('Error deleting Builder:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = {
    builderController ,loginBuilder, getAllBuilders ,getCompletedProjectsForBuilder ,updateBuilder ,changeBuilderPassword ,deleteBuilder ,removeBuilderImage ,updateBuilderImage
};
