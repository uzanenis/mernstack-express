import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import User from "../models/userModel.js"

const router = express.Router()

router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const {fullName, password, phoneNumber, email} = req.body;

        const userExists = await User.findOne({email})
        if (userExists)
            return res.status(400).json({message: "User already exists"})

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber
        })

        return res.status(201).json(createdUser)
    } catch (error) {
        console.log(error)
        return res.json({message: "User create failed"})
    }
})

router.post("/signin", async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({ email })
        if(!user)
            return res.status(400).json({message: "User does not exists"})

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({message: "Password is not corrrect"})

        return res.status(200).json({message: "Authentication successfull"})

    } catch (error) {
        return res.status(400).json({message: error.message})
        console.log(error)
    }
})

export default router;
