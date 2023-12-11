const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');


  class AuthController {
      async LoginMahasiswaDosen(req, res) {
        const { username, password } = req.body;

    try {
    // Cari pengguna berdasarkan mhsName
    const user = await prisma.user.findFirst({ where: { username }, include: { role: true } });

    if (!user) {
      return res.status(401).json({ error: "Kesalahan Kredensial, user tidak ditemukan" });
    }

    // Verifikasi password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Kesalahan Kredensial, password tidak sesuai" });
      }
      
    // Buat token JWT
      const token = jwt.sign({ username: user.username, userId: user.id, role: user.role.roleName, mhsId: user.mhsId },
        "secret_key",
      {expiresIn: '1h'}
      );

    res.json({
      statuscode: 200,
      username: user.username,
      role: user.role.roleName,
      userId: user.id,
      token
      //user
    });
        } catch (error) {
            res.status(500).json({ message: 'Terjadi kesalahan internal' });
            console.log(error);
        }
    }
    async LoginAdmin(req, res) {
      const { username, password } = req.body;
  
  try {
  // Cari pengguna berdasarkan mhsName
  const user = await prisma.user.findFirst({ where: { username }, include: { role: true } });
  
  if (!user) {
    return res.status(401).json({ error: "Kesalahan Kredensial user not found" });
  }
  
  // Verifikasi password
  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (!passwordMatch) {
    return res.status(401).json({ error: "Kesalahan Kredensial, password not match" });
  
    }
    
  // Buat token JWT
  const token = jwt.sign({ userId: user.id, role: user.role.roleName }, "secret_key");
  
  res.json({
    statuscode: 200,
    token,
    //user
  });
      } catch (error) {
          res.status(500).json({ message: 'Terjadi kesalahan internal' });
          console.log(error);
      }
    }
    
    // Logout
    async logout(req, res) {
      const { token } = req.headers["authorization"];
    
      try {
        const decodedToken = jwt.verify(token, "secret_key");
    
        // Check if the token is expired
        const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
        jwt.destroy(decodedToken)

    
        if (isTokenExpired) {
          // Revoke token (setel status revoked menjadi true)
          await prisma.token.update({
            where: { value: token },
            data: { revoked: true },
          });
    
          res.json({ statuscode: 200, message: "Logout berhasil" });
        } else {
          res.status(400).json({ message: "Token masih berlaku, tidak dapat logout" });
        }
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        console.log(isTokenExpired)
      }
    }
    

  
}



module.exports = AuthController;