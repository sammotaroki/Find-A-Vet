import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/api/clinics?featured=true&limit=4")
  const photos = [
    "https://fairviewveterinaryclinic.com/wp-content/uploads/2022/04/fairviewvet-logo.png",
    "http://kingsbridgeanimalclinic.com/uploads/1/4/2/0/142066396/published/3.png?1654631244",
    "https://images.squarespace-cdn.com/content/v1/60c50784af99a435b9c0100e/1623895703775-8JZONZ1WM61DGRYQNLNX/logo_transparent_black_circle.png",
    "https://foothillsanimalclinicelpaso.com/wp-content/uploads/2021/06/1059737_Foothills-Animal-Clinic-v1_060321-e1624474645652.jpg"

  ]
  return (
    <div className="fp">
      {loading ? ("loading") : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.images[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ksh{item.minFee}</span>
              {item.rating &&
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>}
            </div>
          ))}
        </>

      )
      }

      {/* <div className="fpItem">
        <img
          src="http://kingsbridgeanimalclinic.com/uploads/1/4/2/0/142066396/published/3.png?1654631244"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Kingsbridge Animal Clinic</span>
        <span className="fpCity">Mombasa</span>
        <span className="fpPrice">Starting from ksh2,000</span>
        <div className="fpRating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://images.squarespace-cdn.com/content/v1/60c50784af99a435b9c0100e/1623895703775-8JZONZ1WM61DGRYQNLNX/logo_transparent_black_circle.png"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Beaverdale Vet Clinic</span>
        <span className="fpCity">Nakuru</span>
        <span className="fpPrice">Starting from ksh999</span>
        <div className="fpRating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://foothillsanimalclinicelpaso.com/wp-content/uploads/2021/06/1059737_Foothills-Animal-Clinic-v1_060321-e1624474645652.jpg"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Foothills Animal Clinic</span>
        <span className="fpCity">Nairobi</span>
        <span className="fpPrice">Starting from ksh1000</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div> */}
    </div >
  );
};

export default FeaturedProperties;
