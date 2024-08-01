import React, { useState } from "react";
import "./Display.css";

export default function Display({contract, account}) {
  const [data, setData] = useState([]);

  const getData = async() => {
    try {
      const otherAddress = document.querySelector(".address").value;
      let dataArray;
      if(otherAddress){
        dataArray = await contract.display(otherAddress);
        console.log("Data Array: ", dataArray);
      } else {
        dataArray = await contract.display(account[0]);
        console.log("Data Array: ", dataArray[0]);
      }

      const isEmpty = Object.keys(dataArray).length == 0;
      if(!isEmpty){
        const images = dataArray.map((item, i) => {
          return (
            <a href={item} key={i} target="_blank" rel="noopener noreferrer">
              <img src={item} alt="new" className="image-list" />
            </a>
          )
        })
        setData(images);
      } else {
        alert("No Images to display");
      }
    } catch (error) {
      alert("Error: ", error);
    }


  }

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
}
