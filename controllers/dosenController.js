const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require('bcrypt')



class DosenController {
  async getAllDosen(req, res) {
    try {
      const dosens = await prisma.dosen.findMany({
        include: {
          matkul: {
            select: {
            id: true,
            namaMatkul: true
          }
        }
      }
      });
  
      res.status(200).json({
        statusCode: 200,
        dosens,
        
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat menampilkan data dosen", error);
      res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data dosen" });
    }
  }
  

  async getDosenById(req, res) {
    const { id } = req.params;
  
    try {
      const dosen = await prisma.dosen.findFirst({
        where: {
          id: parseInt(id),
        },
        include: {
          matkul: {
            select: {
            id: true,
            namaMatkul: true
          }
        }
        },
      });
  
      if (!dosen) {
        return res.status(400).json({ error: "Data dosen tidak ditemukan" });
      }
  
      res.status(200).json({
        statusCode: 200,
        dosen
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data dosen" });
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

          const requiredFields = ['dosenName', 'matkulId', 'nip'];
          const missingFields = requiredFields.filter(field => !req.body[field]);
    
          if (missingFields.length > 0) {
            return res.status(400).json({
              success: false,
              message: `Field(s) ${missingFields.join(', ')} wajib diisi.`,
            });
          }

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
      
          const matkul = await prisma.matkul.findUnique({
            where: {
              id: parseInt(matkulId)
            },
          })

          // Buat dosen
          const dosen = await prisma.dosen.create({
            data: {
              dosenName,
              nip,
              matkul: {
                connect: {
                  id: parseInt(matkulId)
                }
              },
              
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


          res.status(200).json({
            statusCode: 200,
            id: dosen.id,
            nip: dosen.nip,
            dosenName: dosen.dosenName,
            matkulId: matkul.id,
            matkulName: matkul.namaMatkul
          });
        } catch (error) {
          console.error("Terjadi kesalahan saat menambahkan data Dosen", error);
          res.status(500).json({ error: "Terjadi kesalahan saat menambahkan data Dosen" });
        }
      }
    async updateDosen(req, res){
        const { dosenName, nip, matkulId } = req.body;
        const { id } = req.params;
        try {
            const dosens = await prisma.dosen.update({
                where: {id:parseInt(id)},
                data: {
                  nip,
                  dosenName, 
                  matkulId,
              }
            })
            res.status(200).json({
              statusCode: 200,
              dosens});
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
            res.status(200).json({
              statusCode: 200,
              message: "Sukses menghapus data dosen",
              dosens});
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data dosen" });
          }
    }

};
module.exports = DosenController;