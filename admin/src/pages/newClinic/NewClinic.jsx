import "./newClinic.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { clinicInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewClinic = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [time, setTime] = useState([]);
  const navigate = useNavigate()
  const { data, loading, error } = useFetch("/api/time")

  const handleChange = e => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleSelect = e => {
    const value = Array.from(e.target.selectedOptions, option => option.value)
    setTime(value)
  }
  const handleClick = async e => {
    e.preventDefault()
    try {
      const list = await Promise.all(Object.values(files).map(async (file) => {
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "upload")

        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dtcizpnwe/image/upload", data);

        const { url } = uploadRes.data

        return url
      })
      );

      const newClinic = {
        ...info, time, images: list
      }

      await axios.post("/api/clinics", newClinic)
      navigate("/clinics")
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
          <h1>Add New Clinic</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {clinicInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput" >
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectTime" >
                <label>Time</label>
                <select id="time" multiple onChange={handleSelect}>
                  {loading ? "loading" : data && data.map(time => (
                    <option key={time._id} value={time._id}>{time.title}</option>
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

export default NewClinic;
