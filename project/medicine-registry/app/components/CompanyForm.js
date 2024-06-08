import React, { useState } from 'react';

const CompanyForm = ({ contract, accounts }) => {
    const [medicineName, setMedicineName] = useState('');
    const [medicineDetails, setMedicineDetails] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [numberOfBoxes, setNumberOfBoxes] = useState('');
    const [stripsPerBox, setStripsPerBox] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await contract.methods.submitMedicine(
            medicineName,
            medicineDetails,
            companyName,
            numberOfBoxes,
            stripsPerBox
        ).send({ from: accounts[0] });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Medicine Name" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
            <input type="text" placeholder="Medicine Details" value={medicineDetails} onChange={(e) => setMedicineDetails(e.target.value)} />
            <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            <input type="number" placeholder="Number of Boxes" value={numberOfBoxes} onChange={(e) => setNumberOfBoxes(e.target.value)} />
            <input type="number" placeholder="Strips Per Box" value={stripsPerBox} onChange={(e) => setStripsPerBox(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CompanyForm;
