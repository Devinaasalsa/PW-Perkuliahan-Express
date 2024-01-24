const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');


class AuthController {
  async LoginMahasiswa(req, res) {
    const { username, password } = req.body;

    try {
      // Cari pengguna berdasarkan mhsName
      const user = await prisma.user.findFirst({ where: { username }, include: { role: true } });

      if (!user) {
        return res.status(401).json({ 
          statusCode: 401,
          error: "Kesalahan Kredensial, user tidak ditemukan" });
      }

      // Verifikasi password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ 
          statusCode: 401,
          error: "Kesalahan Kredensial, password tidak sesuai" });
      }
      // return console.log(user);
      // Buat token JWT
      const token = jwt.sign({ userId: user.id, role: user.role.roleName, mhsId: user.mhsId }, "secret_key");

      res.json({
        statusCode: 200,
        token,
        userId: user.id,
        dosenId: user.dosenId,
        adminId: user.adminId,
        mahasiswaId: user.mhsId,
        role: user.role.roleName,
        username: user.username

        //user
      });
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan internal' });
      console.log(error);
    }
  }


}



module.exports = AuthController;