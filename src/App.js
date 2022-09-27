import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

// headers: { CMC_PRO_API_KEY: "04f33277-6bfa-4d69-8940-83b475db8964" },
const apiBaseURL =
  "https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd";

  //*First letter capitalize
  function capitalizeFirstLetter(str) {

    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const columns = [
    {
      name: "Coin",
      selector: (row) => capitalizeFirstLetter(row.symbol),
    },
    {
      name: "Coin Name",
      selector: (row) => capitalizeFirstLetter(row.slug),
    },
    {
      name: "Price",
      selector: (row) => "$" + row.metrics.market_data.price_usd.toFixed(7),
    },
  ];
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
      <h1 className="header">Coin Market World</h1>
      <div>{loading && <p>Loading...</p>}</div>

      <div className="datatable">
        {!loading && <DataTable columns={columns} data={data} />}
      </div>
      <div >Also you can look <a className="footer" target="_blank" href="www.loremcolor.com">loremcolor.com</a></div>
    </div>
  );
}

export default App;
