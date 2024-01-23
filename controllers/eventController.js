const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


class EventController {
    async getAllEvent(req, res) {
        try {
            const events = await prisma.listEvent.findMany();
            res.status(200).json(events);
        } catch (error) {
            console.error("Terjadi kesalahan saat menampilkan data Event", error);
            res
                .status(500)
                .json({ error: "Terjadi kesalahan saat menampilkan data Event" });
        }
    }

    async searchEvent(req, res) {
        const { eventName } = req.query;

        try {
            let searchCondition = {};

            if (eventName) {
                searchCondition = {
                    ...searchCondition,
                    eventName: {
                        contains: eventName,
                    },
                };
            }

            const event = await prisma.listEvent.findMany({
                where: {
                    OR: [searchCondition],
                },
            });

            res.status(200).json(event);
        } catch (error) {
            console.error("Terjadi kesalahan saat mencari event", error);
            res.status(500).json({ error: "Terjadi kesalahan saat mencari event" });
        }
    }

    async createEvent(req, res) {
        const { eventName, places, status, start_date, end_date, file } = req.body;
        try {
            if (!req.files || !req.files[0]) {
                return res.status(400).json({
                    success: false,
                    message: "Tidak ada file yang diunggah",
                });
            }
            const events = await prisma.listEvent.create({
                data: {
                    eventName, 
                    places, 
                    status, 
                    start_date,
                    end_date,
                    file: req.files[0].filename,

                },
            });
            res.status(200).json(
                {
                    message: "Sukses membuat data event",
                    events});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ error: "Terjadi kesalahan saat menambahkan Event" });
        }
    }
    async updateEvent(req, res) {
        const { eventName, places, status, start_date, end_date, file } = req.body;
        const { id } = req.params;
        try {
            if (!req.files || !req.files[0]) {
                return res.status(400).json({
                    success: false,
                    message: "Tidak ada file yang diunggah",
                });
            }
            const events = await prisma.listEvent.update({
                where: { id: parseInt(id) },
                data: {
                    eventName,
                    places,
                    status,
                    start_date,
                    end_date,
                    file: req.files[0].filename,
                }
            })
            res.status(200).json(events);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat update data event" });
        }
    }

    async deleteEvent(req, res) {
        const { id } = req.params;

        try {
            const events = await prisma.listEvent.delete({
                where: { id: parseInt(id) },
            })
            res.status(200).json(
                {
                    statusCode:200,
                message: "Sukses meghapus data Mahasiswa",
                events});
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data event" });
        }
    }
}

module.exports = EventController;