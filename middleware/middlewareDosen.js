const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_key';

class MiddlewareDosen {
  isDosen(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header not provided' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = tokenParts[1];
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      console.log(decoded);
      if (req.user.role === 'Dosen') {
        // Periksa role dengan benar
        next(); // Izinkan akses bagi pengguna dengan role 'Dosen'
      } else {
        return res.status(403).json({ message: 'Anda tidak memiliki akses sebagai Dosen.' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

module.exports = MiddlewareDosen;
