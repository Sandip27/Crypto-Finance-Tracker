import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const Board = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Setting the input as search term
  const searchCoin = (e) => {
    setSearch(e.target.value);
  };

  // Filtering method
  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="board">
      <div className="board-search">
        <h1 className="search-title">Search a currency</h1>
        <form>
          <input
            onChange={searchCoin}
            type="text"
            placeholder="Search"
            className="search"
          />
        </form>
      </div>
      {filterCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.total_volume}
          />
        );
      })}
    </div>
  );
};

export default Board;
