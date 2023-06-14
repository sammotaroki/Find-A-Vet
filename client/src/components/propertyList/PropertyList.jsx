import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { loading } = useFetch("/api/clinics/countByType")


  return (
    <div className="pList">
      {loading ? ("loading") : (
        <>
          <div className="pListItem">
            <img
              src="https://media.istockphoto.com/vectors/medical-clinic-vector-id1254413219?k=20&m=1254413219&s=612x612&w=0&h=65rLy-6k8PCUQG9Gb27V5gvDbWPCZ7oTN-83sRZNagU="
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Clinics</h1>
              <h2>Top clinics</h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://www.insureon.com/-/jssmedia/industry-and-professions/imagery/pet-services/pet-groomer/illustration_pet-groomer.png?h=300&iar=0&w=456&rev=f2f670a9e5434f87b537af197cda77cc"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Groomers</h1>
              <h2>Recommended groomers</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyList;
