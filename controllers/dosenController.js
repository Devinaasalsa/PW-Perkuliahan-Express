const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require('bcrypt')



class DosenController {
    async getAllDosen(req, res) {
    try {
        const dosens = await prisma.dosen.findMany({
            include: {
                matkul: true
            }
        });
        res.status(200).json(dosens);
    } catch (error) {
        console.error("Terjadi kesalahan saat menampilkan data dosen", error);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan saat menampilkan data dosen" });
      }
}

    async getDosenById(req, res) {
        const {id} = req.params;
        try {
            const dosens = await prisma.dosen.findFirst({
                where: {
                    id: parseInt(id),
                },
                
            });
            if (!dosens) {
                return res.json(400).json({error: "Data dosen tidak ditemukan"});
            }
            res.json(dosens);
        }catch (error) {
            console.log(error);
            res.status(500).json({error: "Terjadi kesalahan saat menampilkan data dosen"})
        }
    }

    async searchDosen(req, res) {
      const { dosenName, nip } = req.query;
  
      try {
          let searchCondition = {};
  
          if (dosenName) {
              searchCondition = {
                  ...searchCondition,
                  dosenName: {
                      contains: dosenName,
                  },
              };
          }
  
          if (nip) {
              searchCondition = {
                  ...searchCondition,
                  nip: {
                      contains: nip,
                  },
              };
          }
  
          const dosens = await prisma.dosen.findMany({
              where: {
                  OR: [searchCondition],
              },
          });
  
          res.status(200).json(dosens);
      } catch (error) {
          console.error("Terjadi kesalahan saat mencari dosen", error);
          res.status(500).json({ error: "Terjadi kesalahan saat mencari dosen" });
      }
  }
  

    async createDosen(req, res) {
        const { dosenName, matkulId, nip } = req.body;
        try {
          const existingNip = await prisma.dosen.findUnique({
            where: {
              nip: nip,
            },
          });
      
          if (existingNip) {
            return res.status(500).json({
              error: "Tidak dapat mendaftar dosen, nip telah terdaftar",
            });
          }

          const existingDosen = await prisma.dosen.findUnique({
            where: {
              dosenName: dosenName,
            },
          });
      
          if (existingDosen) {
            return res.status(500).json({
              error: "Tidak dapat mendaftar dosen, nama dosen telah terdaftar",
            });
          }
      
          // Buat dosen
          const dosen = await prisma.dosen.create({
            data: {
              dosenName,
              nip,
              matkul: {
                connect: {
                  id: matkulId
                }
              }
            },
          });
      
          // Buat user
          const hashedPassword = await bcrypt.hash(nip, 10); // You can adjust the salt rounds as needed
          const user = await prisma.user.create({
            data: {
              username: dosenName,
              password: hashedPassword,         
              roleId: 2,
    
              dosenId: dosen.id
            },
          });


          res.json(dosen);
        } catch (error) {
          console.error("Terjadi kesalahan saat menambahkan data Dosen", error);
          res.status(500).json({ error: "Terjadi kesalahan saat menambahkan data Dosen" });
        }
      }
    async updateDosen(req, res){
        const { dosenName } = req.body;
        const { id } = req.params;
        try {
            const dosens = await prisma.dosen.update({
                where: {id:parseInt(id)},
                data: {dosenName}
            })
            res.status(200).json(dosens);
        }catch(error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat update data dosen" });
        }
    }

    async deleteDosen (req, res) {
        const {id} = req.params;

        try {
            const dosens = await prisma.dosen.delete({
                where: {id:parseInt(id)},
            })
            res.status(200).json(dosens);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data dosen" });
          }
    }

};
module.exports = DosenController;