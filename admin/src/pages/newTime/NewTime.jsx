import "./newTime.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { timeInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewTime = () => {
  const [info, setInfo] = useState({});
  const [clinicId, setClinicId] = useState(undefined);
  const [times, setTimes] = useState([]);
  const navigate = useNavigate()
  const { data, loading, error } = useFetch("/api/clinics")

  const handleChange = e => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const timePeriods = times.split(",").map(time => ({ time: time }))
    try {
      await axios.post(`/api/time/${clinicId}`, { ...info, timePeriods })
    } catch (error) {
      return error
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Time</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {timeInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput" >
                <label>Times</label>
                <textarea onChange={e => setTimes(e.target.value)} placeholder="Place a comma between time periods" />
              </div>
              <div className="formInput">
                <label>Choose a clinic</label>
                <select id="clinicId" onChange={e => setClinicId(e.target.value)}>
                  {loading ? "loading" : data && data.map(clinic => (
                    <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTime;
