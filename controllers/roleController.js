const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


class RoleController {
    async createRole(req, res) {
        const { roleName } = req.body;
        try {
          const existingRole = await prisma.role.findUnique({
            where: {
              roleName: roleName,
            },
          });
    
          if (existingRole) {
            return res.status(500).json({
              error: "Tidak bisa menambahkan role, role telah terdaftar",
            });
          }
          const newRole = { roleName };
          const roles = await prisma.role.create({
            data: {
              ...newRole
            },
          });
          res.json(roles);
        } catch (error) {
          console.error("Terjadi kesalahan saat menambahkan Role", error);
          res
            .status(500)
            .json({ error: "Terjadi kesalahan saat menambahkan Role" });
        }
    }
}

module.exports = RoleController;