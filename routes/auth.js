const express = require('express');
const router = express.Router();
const User = require('../models/databse')
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt')
const multer = require('multer')
const jwt = require('jsonwebtoken');
require('dotenv').config()
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, contact, bio } = req.body;
    const user = await User.findOne({ email, contact });
    if (user) {
      return res.status(409).json({ message: 'user is already exist', success: false })
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
      contact,
      bio
    })


    await newUser.save();
    res.status(201).json({
      message: 'signUp successfully',
      success: true
    })

  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      success: false
    })
  }

})
// singup -----------------------------------------------------------------------

router.post('/login',  async (req, res) => {
  try {
    const { email, password, } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: 'email or password is wrong ', success: false })
    }


    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res.status(403).json({ message: 'email or password is wrong ', success: false })
    }


    user.password = await bcrypt.hash(password, 10);

    const jwtToken = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" })
    res.status(200).json({
      message: 'Login successfully',
      success: true,
      jwtToken,
      id: user._id

    })

  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      success: false
    })
  }

})
// login ------------------------------------------------------------

// allUserGet--------------------------------------
router.get('/getuser', async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.json(users)

  } catch (err) {
    res.status(500).json(err.message)
  }
})



// fetchUser----------------------------------
router.get('/account', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user)

  } catch (error) {
    res.status(500).json(error)

  }
})


// userEditData--------------------------
router.put('/account', async (req, res) => {
  try {
    const id = req.query.id;
    const { firstName, lastName, contact, bio, } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Valid User ID is required' });
    }

    if (!firstName || !lastName || !contact || !bio) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      contact,
      bio,
    }, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// imageupload-----------
const uploadDir = path.join(__dirname, '../client/build/Images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null,  Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }); 

router.post('/account', upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const file = req.file.filename 
    
    await User.findByIdAndUpdate(id, { image: file });
    
    res.status(200).json({ image: file });
    console.log(file,'-----filename')

  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Error uploading image' });
  }
});





module.exports = router;