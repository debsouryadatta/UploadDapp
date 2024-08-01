import React from "react";
import "./FileUpload.css";
import { useState } from "react";
import axios from "axios";

export default function FileUpload({account, provider, contract}) {
// 1. Handle image - to upload the image on IPFS
// 2. Retrieve the file
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(file){
      try {
        const formData = new FormData();
        formData.append("file", file);

        let resFile = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
            },
            body: formData,
          }
        );
        resFile = await resFile.json();
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.IpfsHash}`;
        console.log(ImgHash);
        const tx = await contract.add(account[0], ImgHash);
        await tx.wait();
        alert("Image Uploaded Successfully");
        setFileName("");
        setFile(null);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const retrieveFile = (e) => {
    e.preventDefault();
    const data = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(data);
    }
    console.log(data.name);
    setFileName(data.name);
  }

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
}
