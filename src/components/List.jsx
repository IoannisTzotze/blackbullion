import React from "react";
import "./List.css";
import ListItem from "./ListItem";
import axios from "axios";
import { useEffect, useState } from "react";


function List() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    return await axios
      .get("https://www.blackbullion.com/api/_dev/pathways")
      .then((res) => {
        setList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(list.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const sortOptions = [
    { value: "title", label: "Title" },
    { value: "duration", label: "Duration" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredList = list.filter((item) => {
      if (item.intro.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.title.toLowerCase().includes(inputValue.toLowerCase())) {
        return item;
      }
    });
    setList(filteredList);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    setSortValue(e.target.value);
    if (e.target.value === "title") {
      const sortedList = list.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      setList(sortedList);
    } else if (e.target.value === "duration") {
      const sortedList = list.sort((a, b) => {
        if (a.duration < b.duration) {
          return -1;
        }
        if (a.duration > b.duration) {
          return 1;
        }
        return 0;
      });
      setList(sortedList);
    }
    setCurrentPage(1);
  };

  const handleReset = () => {
    loadData();
    setInputValue("");
    setSortValue("");
  };

  return (
    <div className="list">
      <div className="list__navigation">

        <form className="list__search">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search" />
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
        </form>

        <div className="list__sort">
          <select onChange={handleSort} value={sortValue}>
            <option>Filter by</option>
            {sortOptions.map((option, index) => (
              <option value={option.value} key={index}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="list__reset">
          <button onClick={handleReset}> Reset </button>
        </div>
      </div>

      <div className="list__pagination">
        <button onClick={() => prevPage()}>Prev</button>
        {Array.from(Array(Math.ceil(list.length / itemsPerPage)).keys()).map(
          (number) => (
            <button key={number} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          )
        )}
        <button onClick={() => nextPage()}>Next</button>
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        currentItems.map((item, index) => <ListItem item={item} key={index} />)
      )}

      <div className="list__pagination">
        <button onClick={() => prevPage()}>Prev</button>
        {Array.from(Array(Math.ceil(list.length / itemsPerPage)).keys()).map(
          (number) => (
            <button key={number} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          )
        )}
        <button onClick={() => nextPage()}>Next</button>
      </div>
    </div>
  );
}

export default List;
