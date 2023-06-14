import Time from "../models/Time.js"
import Clinic from "../models/Clinic.js"
import { createError } from "../utils/error.js"


export const createTime = async (req, res, next) => {
    const clinicId = req.params.clinicid;
    const newTime = new Time(req.body)

    try {
        const savedTime = await newTime.save()
        try {
            await Clinic.findByIdAndUpdate(clinicId, {
                $push: { times: savedTime._id }
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedTime)
    } catch (error) {
        next(error)
    }
}

export const updateTime = async (req, res, next) => {
    try {
        const updatedTime = await Time.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedTime)
    } catch (err) {
        next(err)
    }
}

export const updateTimeAvailability = async (req, res, next) => {
    try {
        await Time.updateOne(
            { "timePeriods._id": req.params.id },
            {
                $push: {
                    "timePeriods.$.unavailableDates": req.body.dates
                }
            }
        )
        res.status(200).json("Room availability has been modified")
    } catch (err) {
        next(err)
    }
}


export const deleteTime = async (req, res, next) => {
    const clinicId = req.params.clinicid;
    try {
        await Time.findByIdAndDelete(
            req.params.id
        );
        try {
            await Clinic.findByIdAndUpdate(clinicId, {
                $pull: { times: req.params.id },
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json("The room has been deleted")
    } catch (err) {
        next(err)
    }
}
export const getTime = async (req, res, next) => {
    try {
        const time = await Time.findById(
            req.params.id
        );
        res.status(200).json(time)
    } catch (err) {
        next(err)
    }
}
export const getAllTimes = async (req, res, next) => {
    try {
        const times = await Time.find();
        res.status(200).json(times)
    } catch (err) {
        next(err)
    }
}