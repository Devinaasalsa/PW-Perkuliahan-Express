const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


class RoleController {
  async getAllRole(req, res) {
    try {
      const roles = await prisma.role.findMany();
      res.status(200).json(roles);
    } catch (error) {
      console.error("Terjadi kesalahan saat menampilkan data Role", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menampilkan data Role" });
    }
  }

  async getRoleById(req, res) {
    const { id } = req.params;
    try {
      const roles = await prisma.role.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      if (!roles) {
        return res.json(400).json({ error: "Role tidak ditemukan" });
      }
      res.json(roles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data role" })
    }
  }

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
  async updateRole(req, res){
    const { roleName } = req.body;
    const { id } = req.params;
    try {
        const roles = await prisma.role.update({
            where: {id:parseInt(id)},
            data: {roleName}
        })
        res.status(200).json(roles);
    }catch(error) {
        console.log(error)
        res.status(500).json({ error: "Terjadi kesalahan saat update data role" });
    }
}

async deleteRole (req, res) {
    const {id} = req.params;

    try {
        const roles = await prisma.role.delete({
            where: {id:parseInt(id)},
        })
        res.status(200).json(roles);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Terjadi kesalahan saat menghapus data role" });
      }
}
}

module.exports = RoleController;