import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/data');
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Data from Database:</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>{item.name} - {item.age}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewData;
