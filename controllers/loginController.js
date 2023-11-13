const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');


class LoginController {
    async LoginMahasiswa(req, res) {
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
    // return console.log(user);
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

    async LoginDosen(req, res) {
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
}



module.exports = LoginController;