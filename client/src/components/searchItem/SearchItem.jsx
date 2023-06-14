import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img
        src={item?.images[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item?.name}</h1>
        <span className="siTaxiOp">Free drop-offs</span>
        <span className="siSubtitle">
          {item.services}
        </span>
        <span className="siFeatures">
          {item?.desc}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item?.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item?.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{item?.minFee}<span className="siDen">Ksh</span></span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/api/clinics/${item?._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
