import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Search from "../components/Dashboard/Search/search";
import Tabs from "../components/Dashboard/Tabs/tabs";
import { DASHBOARD_API_URL } from "../constants";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Loading from "../components/Common/Loading/loading";
import PaginationComponent from "../components/Dashboard/PaginationComponent/pagination";
import Footer from "../components/Common/Footer";

function DashboardPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCoins, setPageCoins] = useState([]);

  var filteredCoins = data.filter((item) => {
    if (
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return item;
    }
  });

  useEffect(() => {
    axios
      .get(DASHBOARD_API_URL)
      .then((response) => {
        console.log("Response Data >>>", response.data);
        setData(response.data);
        setLoading(false);
        setPageCoins(response.data.slice(0, 10));
      })
      .catch((error) => {
        console.log("Error>>>", error);
      });
  }, []);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  let mybutton = document.getElementById("myBtn");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "flex";
    } else {
      mybutton.style.display = "none";
    }
  }

  const handleChange = (event, value) => {
    setPageNumber(value);
    setPageCoins(data.slice((value - 1) * 10, (value - 1) * 10 + 10));
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Search search={search} setSearch={setSearch} />
          <Tabs data={search ? filteredCoins : pageCoins} />
          <div onClick={() => topFunction()} id="myBtn" className="top-btn">
            <ArrowUpwardIcon sx={{ color: "var(--blue)" }} />
          </div>
          {!search && (
            <PaginationComponent
              pageNumber={pageNumber}
              handleChange={handleChange}
            />
          )}
        </>
      )}
      <Footer />
    </div>
  );
}

export default DashboardPage;
