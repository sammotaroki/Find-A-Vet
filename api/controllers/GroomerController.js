import Groomer from "../models/Groomer.js"

export const createGroomer = async (req, res, next) => {
    const newGroomer = new Groomer(req.body)
    try {
        const savedGroomer = await newGroomer.save()
        res.status(200).json(savedGroomer)
    } catch (err) {
        next(err)
    }
}

export const updateGroomer = async (req, res, next) => {
    try {
        const updatedGroomer = await Groomer.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedGroomer)
    } catch (err) {
        next(err)
    }
}
export const deleteGroomer = async (req, res, next) => {
    try {
        await Groomer.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("The groomer has been deleted")
    } catch (err) {
        next(err)
    }
}
export const getGroomer = async (req, res, next) => {
    try {
        const groomer = await Groomer.findById(
            req.params.id
        );
        res.status(200).json(groomer)
    } catch (err) {
        next(err)
    }
}
export const getAllGroomers = async (req, res, next) => {
    try {
        const groomers = await Groomer.find();
        res.status(200).json(groomers)
    } catch (err) {
        next(err)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Groomer.countDocuments({ city: city })
        }));
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const groomerCount = await Groomer.countDocuments({ type: "groomer" })

        res.status(200).json(
            { count: groomerCount }
        )
    } catch (err) {
        next(err)
    }
}
