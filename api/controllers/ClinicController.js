import Clinic from "../models/Clinic.js"
import Groomer from "../models/Groomer.js"
import Time from "../models/Time.js"

export const createClinic = async (req, res, next) => {
    const newClinic = new Clinic(req.body)
    try {
        const savedClinic = await newClinic.save()
        res.status(200).json(savedClinic)
    } catch (err) {
        next(err)
    }
}
export const updateClinic = async (req, res, next) => {
    try {
        const updatedClinic = await Clinic.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedClinic)
    } catch (err) {
        next(err)
    }
}
export const deleteClinic = async (req, res, next) => {
    try {
        await Clinic.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("The clinic has be deleted")
    } catch (err) {
        next(err)
    }
}
export const getClinic = async (req, res, next) => {
    try {
        const clinic = await Clinic.findById(
            req.params.id
        );
        res.status(200).json(clinic)
    } catch (err) {
        next(err)
    }
}
export const getAllClinics = async (req, res, next) => {
    const { max, min, ...other } = req.query
    try {
        const clinics = await Clinic.find({ ...other, minFee: { $gt: min || 99, $lt: max || 9999 } }).limit(req.query.limit);
        res.status(200).json(clinics)
    } catch (err) {
        next(err)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Clinic.countDocuments({ city: city })
        }));
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const clinicCount = await Clinic.countDocuments({ type: "clinic" })

        res.status(200).json({ clinicCount })
    } catch (err) {
        next(err)
    }
}

export const countByService = async (req, res, next) => {
    try {
        const canineCount = await Clinic.countDocuments({ services: "Canine" })
        const felineCount = await Clinic.countDocuments({ services: "Feline" })
        const otherCount = await Clinic.countDocuments({ services: "Canine,Feline & Other" })

        res.status(200).json([
            { services: "Canine", count: canineCount },
            { services: "Feline", count: felineCount },
            { services: "Canine,Feline & Other", count: otherCount }
        ])
    } catch (err) {
        next(err)
    }
}

export const getClinicTimes = async (req, res, next) => {
    try {
        const clinic = await Clinic.findById(req.params.id)
        const list = await Promise.all(clinic.times.map((time) => {
            return Time.findById(time)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
