const express = require("express");
const router = express.Router();
const Validator = require('fastest-validator')
const v = new Validator()
const {Produk} = require("../models")


// GET
router.get("/", async (req, res, next) => {
    const produk = await Produk.findAll();
    return res.json({
        status: 200,
        message: "Berhasil menampilkan semua data",
        data: produk
    })
});

// GET DATA BY ID
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    let produk = await Produk.findByPk(id);
    if (!produk) {
        return res.status(404).json({
            status: 404,
            message: "Data tidak ditemukan"
        })
    } else {
        return res.json({
            status: 200,
            message: "Berhasil menampilkan data",
            data: produk
        })
    }
});

//POST
router.post("/", async (req, res, next) => {
    //validation
    const schema = {
        nama: "string",
        deskripsi: "string|optional"
    }
    const validate = v.validate(req.body, schema)
    if(validate.length) {
        return res.status(400).json(validate)
    }
    //proses create data -> table
    const produk = await Produk.create(req.body)
    res.json({
        status: 200,
        message: "Berhasil membuat data",
        data: produk
    });
});

// PUT
router.put("/:id", async (req, res, next) => {
    const id = req.params.id
    let produk = await Produk.findByPk(id);
    if (!produk) {
        return res.status(404).json({status: 404, message: "Data tidak ditemukan"})
    }
    // validation
    const schema = {
        nama: "string|optional",
        deskripsi: "string|optional"
    }
    const validate = v.validate(req.body, schema)
    if(validate.length) {
        return res.status(400).json(validate)
    }
    // proses update
    produk = await produk.update(req.body);
    res.json({
        status: 200,
        message: "Berhasil mengupdate data",
        data: produk
    });
});

// DELETE
router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    let produk = await Produk.findByPk(id);
    if (!produk) {
        return res.status(404).json({
            status: 404,
            message: "Data tidak ditemukan"
        })
    }
    // proses delete data
    await produk.destroy();
    res.json({
        status: 200,
        message: "Berhasil menghapus data"
    })
});

module.exports = router;