### Steps of Dev:
1. - Creating the smart contract for the upload project, creating the 5 functions
       - add() -> To add the file urls to the blockchain
       - allow() -> To allow the files to be accessed by the other users
       - disallow() -> To disallow the files to be accessed by the users permitted earlier
       - display() -> To get the file urls of the files uploaded by the user
       - shareAccess() -> To get the list of users who are permitted

2. `pnpm i --save-dev hardhat`, `npx hardhat init`, some config changes in the hardhat.config.js

3. `pnpm create vite`, to create the client react app

4. `npx hardhat node` -> to start the local blockchain, `npx hardhat run scripts/deploy.js --network localhost` -> to deploy the contract to the local blockchain(Even if we don't specify the network localhost, it will deploy to the local blockchain)

5. Creating Localhost network in the Metamask, hence connecting to the local blockchain

6. Since Hardhat and Anvil provide the same private keys for their sample accounts in local blockchains, so I already have the previously imported privateKey/account in the Metamask so I don't need to import the account again

7. In the client react app -> creating a wallet() function in the useEffect of App.jsx, to connect the wallet and store some state variables like account, provider, signer, contract, etc

8. Copy pasting the Ui & css of App.jsx, Display, FileUpload & Modal Components from Github repo to our code

9. Writing the 2 main functions - retriveFile() & handleSubmit() in the FileUpload.jsx component

10. `pnpm i axios`, we will be using axios for the file upload to pinata, reading the image file in the retriveFile() func and uploading it to the pinata using handleSubmit() func

11. Pinata Api error fix -> It was giving problem since during creating an api key, we can at max give 500 uses but it was unlimited by default which gave the error

12. After uploading image to pinata, when we are pushing the url to local blockchain it was giving error in metemask, so we switched to live sepolia test network(using alchemy) -> `npx hardhat run scripts/deploy.js --network sepolia`

13. In the display component, we are fetching the image urls specific to the address using the contract instance to call the display() function and showing it in the UI

14. In the Modal component, we are sharing access/calling allow function, and also getting the list of shared users by calling the shareAccess() function

15. Finally deploying the client react app on Vercel





