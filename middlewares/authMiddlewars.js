import { verifyToken } from "../utils/jwt.js";

export function isAuthenticated (req , res , next ) {
    const token = req.cookies.token; 


    if (!token) {
        return res.status(401).json({ message: 'Missing token' });}

    try {

        const decoded = verifyToken(token)
        req.user = decoded;

        next()


    } catch(err) {
        res.status(403).json({'message' : 'Invalid token'})

    }



}

export function  isAdmin  (req, res, next)  {
  try {
    if (req.user && req.user.role == 'admin') {
      next(); 
    } else {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};