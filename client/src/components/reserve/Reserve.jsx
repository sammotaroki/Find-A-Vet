import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import useFetch from '../../hooks/useFetch'
import { SearchContext } from "../../context/SearchContext"
import "./reserve.css"
import axios from 'axios'

const Reserve = ({ setOpen, clinicId }) => {

    const [selectedTime, setSelectedTime] = useState([])
    const { data, loading, error } = useFetch(`/api/clinics/time/${clinicId}`)
    const { date } = useContext(SearchContext)



    const getDate = (startDate) => {
        const start = new Date(startDate)
        const aptdate = new Date(start).toDateString()

        return aptdate
    }

    const datestamp = getDate(date)

    const isAvailable = (timePeriod) => {
        const isFound = timePeriod.unavailableDates.some(date =>
            datestamp.includes(new Date(date).toDateString())
        )
        return !isFound
    }

    const handleSelectTime = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedTime(
            checked
                ? [...selectedTime, value]
                : selectedTime.filter(item => item !== value)
        )
    }

    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedTime.map(timeId => {
                    const res = axios.put(`/api/time/available/${timeId}`, { dates: datestamp })
                    return res.data
                })
            )
            setOpen(false)
            navigate("/")
        } catch (error) {

        }
    }

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faXmarkCircle} className="rClose" onClick={() => setOpen(false)} />
                <span className="rSubTitle">Choose appointment time</span>
                {data.map(item => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.timePeriods.map(timePeriod => (
                                <div className="time" >
                                    <label className="rTimePeriod">{timePeriod.time}</label>
                                    <input className="rcheckBox"
                                        type="checkbox"
                                        value={timePeriod._id}
                                        onChange={handleSelectTime}
                                        disabled={!isAvailable(timePeriod)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="rButton" onClick={handleClick}>Reserve Now</button>
            </div>
        </div>
    )
}

export default Reserve