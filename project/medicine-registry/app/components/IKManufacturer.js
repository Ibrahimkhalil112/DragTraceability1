import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

const IKManufacturer = ({ contract, accounts }) => {
    const [medicines, setMedicines] = useState([]);

    const fetchData = async () => {
        const count = await contract.methods.medicines.length().call();
        const medicinesArray = [];
        for (let i = 0; i < count; i++) {
            const medicine = await contract.methods.getMedicine(i).call();
            medicinesArray.push({ ...medicine, id: i });
        }
        setMedicines(medicinesArray);
    };

    useEffect(() => {
        fetchData();
    }, [contract]);

    const handleApprove = async (id) => {
        await contract.methods.approveMedicine(id).send({ from: accounts[0] });
        fetch()
        fetchData();
    };

    return (
        <div>
            {medicines.map((m, index) => (
                <div key={index}>
                    <h3>{m.medicineName}</h3>
                    <p>{m.medicineDetails}</p>
                    <p>{m.companyName}</p>
                    <p>Number of Boxes: {m.numberOfBoxes}</p>
                    <p>Strips per Box: {m.stripsPerBox}</p>
                    {m.approved ? (
                        <QRCode value={`${m.medicineName} ${m.medicineDetails} ${m.companyName}`} />
                    ) : (
                        <button onClick={() => handleApprove(m.id)}>Approve</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default IKManufacturer;
