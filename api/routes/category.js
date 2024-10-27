const express = require('express');
const { categorySchema } = require('../zod');
const { Category } = require('../models/Category');
const router = express.Router();

router.post("/",async(req,res)=>{
    const catInfo = req.body;
    categorySchema.safeParse(catInfo);
    const catCreated = await Category.create(catInfo);
    res.json(catCreated);
})

router.get("/",async(req,res)=>{
    const catsFound = await Category.find({});
    res.json(catsFound);
})





module.exports = router;