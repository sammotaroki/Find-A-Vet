import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

  const { data, loading, error } = useFetch("/api/clinics/countByCity?cities=Nairobi,Mombasa,Nakuru")

  console.log(data)

  return (
    <div className="featured">
      {loading ? ("Loading please wait") : (
        <>
          <div className="featuredItem">
            <img
              src="https://i.pinimg.com/originals/ba/40/3b/ba403bd2a0abe867d6c1afe6ae230035.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Nairobi</h1>
              <h2>{data[0]} clinics</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://pbs.twimg.com/media/FWqkXIvXoAAKqhV.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mombasa</h1>
              <h2>{data[1]} clinics</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://nakuru.go.ke/wp-content/uploads/2021/06/Best-Estates-To-Live-In-Nakuru.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Nakuru</h1>
              <h2>{data[2]} clinics</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
