import React from "react";
// import data from "../../assets/admin/donate.json";
import "../../styles/donationdetails.scss";

function DonationDetails({data}) {
  console.log(data);
  return (
    <div className="description-box">
      <h2>Details</h2>
      <br/>
      {data ? (
  data.items.map((item, index) => (
    <div key={index}>
      <h3>{item.name}</h3>
      <p>{item.discription}</p>
      <div className="donatebutton">
      <button>Donate now</button>
      </div>
    </div>
  ))
) : (
  <p>Loading...</p>
)}
    </div>
  );
}

export default DonationDetails;
