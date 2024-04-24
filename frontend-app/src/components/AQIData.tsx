import React, { useState, useEffect } from 'react';

interface Attribution {
  url: string;
  name: string;
  logo?: string;
}

interface City {
  geo: number[];
  name: string;
  url: string;
  location: string;
}

interface IAQIValue {
  v: number;
}

interface IAQI {
  co?: IAQIValue;
  h?: IAQIValue;
  no2?: IAQIValue;
  o3?: IAQIValue;
  p?: IAQIValue;
  pm10?: IAQIValue;
  pm25?: IAQIValue;
  so2?: IAQIValue;
  t?: IAQIValue;
  w?: IAQIValue;
}

interface AQIData {
  aqi: number;
  idx: number;
  attributions: Attribution[];
  city: City;
  dominentpol: string;
  iaqi: IAQI;
}

interface AQIResponse {
  status: string;
  data: AQIData;
}

const AQIComponent = () => {
  const [aqiData, setAqiData] = useState<AQIResponse | null>(null);
  const backendUrl = 'https://silver-chainsaw-55x4pgvxg7rfj5g-3000.app.github.dev/api/aqi/london'; // URL to fetch AQI data for London

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendUrl);
        if (!response.ok) throw new Error('Failed to fetch');
        const data: AQIResponse = await response.json();
        setAqiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!aqiData) return <div>Loading...</div>;

  return (
    <div>
      <h2>{aqiData.data.city.name} AQI</h2>
      <p>AQI Value: {aqiData.data.aqi}</p>
      <p>Primary Pollutant: {aqiData.data.dominentpol}</p>
      <p>Temperature: {aqiData.data.iaqi.t?.v}°C</p>
      <div>
        <h3>Attributions:</h3>
        {aqiData.data.attributions.map((attr, index) => (
          <p key={index}><a href={attr.url}>{attr.name}</a></p>
        ))}
      </div>
    </div>
  );
};

export default AQIComponent;
