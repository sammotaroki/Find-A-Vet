import Room from "../models/Room.js"
import Clinic from "../models/Clinic.js"
import { createError } from "../utils/error.js"


export const createRoom = async (req, res, next) => {
    const clinicId = req.params.clinicid;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Clinic.findByIdAndUpdate(clinicId, {
                $push: { rooms: savedRoom._id }
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom)
    } catch (err) {
        next(err)
    }
}
export const deleteRoom = async (req, res, next) => {
    const clinicId = req.params.clinicid;
    try {
        await Room.findByIdAndDelete(
            req.params.id
        );
        try {
            await Clinic.findByIdAndUpdate(clinicId, {
                $pull: { rooms: req.params.id },
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json("The room has be deleted")
    } catch (err) {
        next(err)
    }
}
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(
            req.params.id
        );
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}
export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
}