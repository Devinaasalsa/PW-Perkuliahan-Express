// import { Mahasiswa } from "@prisma/client";
import { Mahasiswa } from "@prisma/client";
var Prisma = require('@prisma/client');

const prisma = new PrismaClient();

export const getMahasiswa = async (_req, res) => {
    try {
        
        const mahasiswa = await prisma.mahasiswa.findMany({});
        res.status(200).json(mahasiswa);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}