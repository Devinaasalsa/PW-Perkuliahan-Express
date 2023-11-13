const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_key';

class MiddlewareMahasiswa {
  generateToken(userId) {
    // Buat token JWT dengan role 'Mahasiswa' berdasarkan userId
    const token = jwt.sign({ userId, roleName: 'Mahasiswa' }, jwtSecret);
    return token;
  }

  isMahasiswa(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      console.log('Authorization header not provided');
      return res.status(401).json({ message: 'Authorization header not provided' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      console.log('Invalid token format');
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = tokenParts[1];
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;

      console.log('Payload Token:', req.user); // Tambahkan ini untuk mencetak role pengguna
      // Periksa role pengguna
      if (req.user.role === 'Mahasiswa') {
        next(); // Hanya izinkan akses bagi pengguna dengan role 'mahasiswa'
      } else {
        console.log('Akses ditolak untuk role:', req.user.roleName);
        return res.status(403).json({ message: 'Anda tidak memiliki akses sebagai mahasiswa.' });
      }
    } catch (error) {
      console.log('Token tidak valid:', error.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

module.exports = MiddlewareMahasiswa;
