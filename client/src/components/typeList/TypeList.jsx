import { faImages } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import "./typeList.css";

const TypeList = () => {
  const { data, loading, error } = useFetch("/api/clinics/countByService")

  const images = [
    "https://www.upperpawside.com/wp-content/uploads/2021/07/interesting-facts-about-beagles-introduction.jpg",
    "https://cf.ltkcdn.net/cats/images/orig/259025-1600x1030-gorgeous-grey-cat-breeds.jpg",
    "https://i.pinimg.com/originals/4c/7c/48/4c7c481eb384db8208b0248cb0451024.jpg"

  ]
  console.log(data)
  return (
    <div className="pList">
      {loading ? ("loading") : (
        <>
          {data && images.map((img, i) => (
            <div className="pListItem" key={i}>
              <img
                src={img}
                alt=""
                className="pListImg"
              />
              <div className="pListTitles">
                <h1>{data[i]?.services}</h1>
                <h2>{data[i]?.count} {data[i]?.services} clinics</h2>
              </div>
            </div>
          ))}

        </>
      )}
    </div>
  );
};

export default TypeList;


{/* <div className="pListItem">
            <img
              src="https://cf.ltkcdn.net/cats/images/orig/259025-1600x1030-gorgeous-grey-cat-breeds.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Cats</h1>
              <h2>Clinics recommended for you</h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://i.pinimg.com/originals/4c/7c/48/4c7c481eb384db8208b0248cb0451024.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Other</h1>
              <h2>Clinics for your other pet</h2>
            </div>
          </div> */}