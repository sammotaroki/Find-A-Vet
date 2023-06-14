import {
  faCalendarDays,
  faCat,
  faDog,
  faLocationDot,
  faMicrochip,
  faScissors,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { Calendar } from "react-date-range";
import DateTimepicker from "react-calendar-datetime-picker";
import 'react-calendar-datetime-picker/dist/index.css'

import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState('');
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    dog: 0,
    cat: 0,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext)

  const handleSelect = (date) => {
    setDate(format(date, 'dd/MM/yyyy'))
    //console.log(format(date, 'MM/dd/yyyy'))
  }

  useEffect(() => {
    setDate(format(new Date(), 'dd/MM/yyyy'))
  }, [])



  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } })
    navigate("/clinics", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faDog} />
            <span>Pets</span>
          </div>
          {/* <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div> */}
          <div className="headerListItem">
            <FontAwesomeIcon icon={faMicrochip} />
            <span>Micro-chipping</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faScissors} />
            <span>Grooming</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Drop-off / Pick-up </span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Looking for a Vet? Look no <span className="fur">fur</span>-ther.
            </h1>
            <p className="headerDesc">
              Get in touch with the best vets – get <span className="free">FREE</span> immunization shots for puppies and kittens
            </p>
            {!user &&
              <button className="headerBtn">Sign in </button>
            }
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faLocationDot} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Name of City"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  value={date}
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${(date)}`}</span>
                {openDate && (
                  <Calendar
                    className="date"
                    minDate={new Date()}
                    selected={date}
                    onChange={handleSelect}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCat} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.dog} dog · ${options.cat} cat `}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Dog</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.dog <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("dog", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.dog}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("dog", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Cat</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.cat <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("cat", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.cat}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("cat", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/*<div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>*/}
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtnSearch" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
