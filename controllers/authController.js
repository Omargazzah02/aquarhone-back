const prisma = require('../prisma/client'); 
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');


const login = async (req, res) => {
  
const { email, password } = req.body;

try{
  if (!email || !password) {
      return res.status(400).json({ 'message': 'Email and password are required' })}

  const user = await prisma.user.findUnique({ where: { email } });


     if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user)

  res.cookie('token', token, {
    
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 24 * 60 * 60 * 1000, 
    sameSite: 'lax',
  });


res.cookie('role', user.role, {
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'lax',
  path: '/',
});

  res.json({ message: 'Login successful' });
  }catch(err) {

    console.log(err)
    
    res.status(500).json({ message: 'Internal server error' });

  }
};




const register = async(req , res ) => {
    const { username, email, password } = req.body;
      if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  try {

     const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'user'
      },
    });

    res.status(201).json({ message: 'User registered successfully' });









  }
   catch(err) {

 console.log(err)
 res.status(500).json({ message: 'Internal server error' });

  }



}















module.exports = { login , register};