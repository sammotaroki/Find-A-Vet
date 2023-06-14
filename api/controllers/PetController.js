import Pet from "../models/Pet.js"
import User from "../models/User.js"
import { createError } from "../utils/error.js"


export const createPet = async (req, res, next) => {
    const userId = req.params.userid;
    const newPet = new Pet(req.body)

    try {
        const savedPet = await newPet.save()
        try {
            await User.findByIdAndUpdate(userId, {
                $push: { pets: savedPet._id }
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedPet)

    } catch (error) {
        next(error)
    }
}

export const updatePet = async (req, res, next) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPet)
    } catch (err) {
        next(err)
    }
}
export const deletePet = async (req, res, next) => {
    const userId = req.params.userid;
    try {
        await Pet.findByIdAndDelete(
            req.params.id
        );
        try {
            await User.findByIdAndUpdate(userId, {
                $pull: { pets: req.params.id }
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json("The pet has be removed")
    } catch (err) {
        next(err)
    }
}
export const getPet = async (req, res, next) => {
    try {
        const pet = await Pet.findById(
            req.params.id
        );
        res.status(200).json(pet)
    } catch (err) {
        next(err)
    }
}

export const getAllPets = async (req, res, next) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets)
    } catch (err) {
        next(err)
    }
}
