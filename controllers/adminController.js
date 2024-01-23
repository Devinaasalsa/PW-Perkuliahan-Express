const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


class AdminController {
    async getAllAdmin(req, res) {
    try {
        const admins = await prisma.admin.findMany();
        
        const adminsWithoutPassword = admins.map(({ password, ...adminWithoutPassword }) => adminWithoutPassword);

        res.status(200).json(adminsWithoutPassword);
    } catch (error) {
        console.error("Terjadi kesalahan saat menampilkan data admin", error);
        res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data admin" });
    }
}

    async searchAdmin(req, res) {
        const { adminName} = req.query;
    
        try {
            let searchCondition = {};
    
            if (adminName) {
                searchCondition = {
                    ...searchCondition,
                    adminName: {
                        contains: adminName,
                    },
                };
            }
    
            const admins = await prisma.admin.findMany({
                where: {
                    OR: [searchCondition],
                },
            });

            const adminsWithoutPassword = admins.map(({ password, ...adminWithoutPassword }) => adminWithoutPassword);

    
            res.status(200).json(adminsWithoutPassword);
        } catch (error) {
            console.error("Terjadi kesalahan saat mencari admin", error);
            res.status(500).json({ error: "Terjadi kesalahan saat mencari admin" });
        }
    }

    async createAdmin(req, res) {
        const { adminName, password } = req.body;
        try {
            const requiredFields = ['adminName', 'password'];
            const missingFields = requiredFields.filter(field => !req.body[field]);
      
            if (missingFields.length > 0) {
              return res.status(400).json({
                success: false,
                message: `Field(s) ${missingFields.join(', ')} wajib diisi.`,
              });
            }
      
            const existingName = await prisma.admin.findUnique({
                where: {
                    adminName: adminName,
                }
            });

            if (existingName) {
                return res.status(500).json({
                    error: "Tidak dapat mendaftar admin, nama telah terdaftar",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the salt rounds as needed

            const admin = await prisma.admin.create({
                data: {
                    adminName,
                    password: hashedPassword
                }
            })

            const user = await prisma.user.create({
                data: {
                    username: adminName,
                    password: hashedPassword,
                    roleId: 1,

                    adminId: admin.id
                },
            });
            res.json(admin);
        }
        catch (error) {
            console.error("Terjadi kesalahan saat menambahkan data Admin", error);
            res.status(500).json({ error: "Terjadi kesalahan saat menambahkan data Admin" });
        }
    }

    async updateAdmin(req, res){
        const { adminName } = req.body;
        const { id } = req.params;
        try {
            const admin = await prisma.admin.update({
                where: {id:parseInt(id)},
                data: {adminName}
            })
            res.status(200).json(admin);
        }catch(error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat update data admin" });
        }
    }

    async deleteAdmin (req, res) {
        const {id} = req.params;

        try {
            const admin = await prisma.admin.delete({
                where: {id:parseInt(id)},
            })
            res.status(200).json(admin);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data admin" });
          }
    }


}
module.exports = AdminController;