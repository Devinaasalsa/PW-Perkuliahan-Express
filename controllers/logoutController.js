const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class logoutController {
    async logout(req, res) {
        const { userId } = req.body;
      
        try {
          // Temukan token yang belum di-revoke untuk pengguna tertentu
          const activeToken = await prisma.token.findFirst({
            where: {
              userId: userId,
              revoked: false,
            },
          });
      
          if (!activeToken) {
            return res.status(401).json({ error: "Token tidak ditemukan atau sudah di-revoke" });
          }
      
          // Revoke token (setel status revoked menjadi true)
          const revokedToken = await prisma.token.update({
            where: { id: activeToken.id },
            data: { revoked: true },
          });
      
          res.json({ statuscode: 200, message: "Logout berhasil" });
        } catch (error) {
          res.status(500).json({ message: 'Terjadi kesalahan internal' });
          console.log(error);
        }
      }
      
}

module.exports = logoutController;