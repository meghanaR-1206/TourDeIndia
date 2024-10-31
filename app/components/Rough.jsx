import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/firebaseConfig';

const FetchData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                const result = await response.json();
                console.log('result', result)
                setData(result);
                uploadDataToFirestore(result);
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };
        fetchData();
    }, []);

    const uploadDataToFirestore = async (data) => {
        // const data = JSON.parse(fs.readFileSync(result, 'utf-8'));
        try {
            // for (const [key, value] of Object.entries(data)) {
                // Add each value (which is an object) to Firestore
                await addDoc(collection(fireDB, "jsonData"), data);
            // }
            console.log("Data successfully uploaded!");
        } catch (error) {
            console.error("Error uploading data: ", error);
        }
    };

    return (
        <div>
            <h1>Fetched Data</h1>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default FetchData;