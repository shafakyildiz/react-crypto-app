import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
// headers: { CMC_PRO_API_KEY: "04f33277-6bfa-4d69-8940-83b475db8964" },
const apiBaseURL =
  "https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(apiBaseURL);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Coin Market World</h1>
      <div>{loading && <p>Loading...</p>}</div>
      {!loading &&
        data.map((item) => (
          <li key={item.id} style={{ listStyleType: "none" }}>
            {item.symbol} ({item.slug}) - ${item.metrics.market_data.price_usd}
          </li>
        ))}
    </div>
  );
}

export default App;
