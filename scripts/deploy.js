const main = async() => {
    const Upload = await ethers.getContractFactory("Upload");
    const upload = await Upload.deploy();

    await upload.waitForDeployment();
    console.log("Upload deployed to:", await upload.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})