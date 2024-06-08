'use client'
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import CompanyForm from './components/CompanyForm';
import IKManufacturer from './components/IKManufacturer';
import MedicineRegistry from './components/MedicineRegistry.json';

const Home = () => {
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const init = async () => {
            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            const accounts = await web3.eth.requestAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = MedicineRegistry.networks[networkId];
            const instance = new web3.eth.Contract(
                MedicineRegistry.abi,
                deployedNetwork && deployedNetwork.address,
            );

            setAccounts(accounts);
            setContract(instance);
        };

        init();
    }, []);

    if (!contract) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <nav>
                <a href="#company">Company</a>
                <a href="#ik-manufacturer">IK Manufacturer</a>
            </nav>
            <section id="company">
                <CompanyForm contract={contract} accounts={accounts} />
            </section>
            <section id="ik-manufacturer">
                <IKManufacturer contract={contract} accounts={accounts} />
            </section>
        </div>
    );
};

export default Home;
