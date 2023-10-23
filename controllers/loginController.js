const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');


class LoginController {
    async getMahasiswaById(req, res) {
        try {
            const { mhsName, nim } = req.body;

            const user = await prisma.mahasiswa.findFirst({
                where: { mhsName }
            });

            if (!user) {
                return res.status(401).json({ message: "Nama mahasiswa tidak ditemukan" });
            }
            
            const nimMatch =  bcrypt.compare(nim, String(user.nim));
            if (!nimMatch) {
                return res.status(401).json({ message: 'Password salah' });
            }

            const token = jwt.sign({ nimId: user.id }, 'secret-key', { expiresIn: '1h' });
            
            res.json({ token });
        } catch (error) {
            // Handle error, misalnya dengan mengirim respons 500 jika terjadi kesalahan internal.
            res.status(500).json({ message: 'Terjadi kesalahan internal' });
            console.log(error)
        }
    }
}

module.exports = LoginController;