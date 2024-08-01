import React, { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const contractAddress = "0xfCDeefb4A95b9EA7157b3C645F5FC4F5eb4b2bc0";
    const provider = new ethers.BrowserProvider(window.ethereum);

    const wallet = async () => {
      try {
        if (provider) {
          // Add event listeners to handle account and chain changes
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          })
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          })

          const account = await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );
          console.log(contract);

          setAccount(account);
          setProvider(provider);
          setSigner(signer);
          setContract(contract);
        } else {
          alert("Metamask is not installed");
        }
      } catch (error) {
        console.log(error);
      }
    };

    wallet();
  }, []);

  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>UploadDapp</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        />
        <Display contract={contract} account={account} />
      </div>
    </>
  );
}

export default App;
