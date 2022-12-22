import React, { useState } from "react";
import Input from "./Input";
import classes from "./SearchBar.module.css";

interface SearchBarProps {
  searchedValues?: any;
  // searchResults will be returned as set to avoid value dublication so be sure to convert it again into array
  setSeachResults: any;
}

const SearchBarClick = (props: SearchBarProps) => {
  const [filterSearches, setFilterSearches] = useState([]);

  const filterHandler = (event: any) => {
    const searchWord = event.target.value;
    const newFilter = props.searchedValues.filter((value: any) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilterSearches(newFilter);
  };

  const blurHandler = () => {
    setTimeout(handler, 1000);
    function handler() {
      setFilterSearches([]);
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        onChange={filterHandler}
        onBlur={blurHandler}
      />
      {filterSearches.length != 0 && (
        <div className={classes.search_results}>
          {filterSearches.slice(0, 15).map((value: string) => {
            return (
              <span key={Math.random()} className={classes.search_item}>
                <p
                  onClick={() => {
                    props.setSeachResults((prevState) => [...prevState, value]);
                    setFilterSearches([]);
                  }}
                >
                  {value}
                </p>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SearchBarAuto = (props: { setFilter: any }) => {
  const handleChange = (event: any) => {
    props.setFilter(event.target.value);
  };

  return (
    <div className={classes.search_bar}>
      <Input type="text" placeholder="Search..." onChange={handleChange} />
    </div>
  );
};

export { SearchBarClick, SearchBarAuto };
