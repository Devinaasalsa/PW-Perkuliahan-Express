const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');


class LoginController {
    async LoginMahasiswa(req, res) {
        const { username, password } = req.body;

  try {
    // Cari pengguna berdasarkan mhsName
    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Kesalahan Kredensial" });
    }

    // Verifikasi password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Kesalahan Kredensial" });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user.id }, "secret_key");

    res.json({
      statuscode: 200,
      token,
      //user
    });
        } catch (error) {
            // Handle error, misalnya dengan mengirim respons 500 jika terjadi kesalahan internal.
            res.status(500).json({ message: 'Terjadi kesalahan internal' });
            console.log(error);
        }
    }
    
}

module.exports = LoginController;