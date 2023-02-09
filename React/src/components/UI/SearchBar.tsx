import React, { useState, useEffect } from "react";
import { useHttpClient } from "src/hooks/http-hook";
import Input from "./Input";
import classes from "./SearchBar.module.css";

interface SearchBarProps {
  setSeachResults?: any;
  className?: any;
  redirect?:boolean;
}

const SearchBarUsers = (props: SearchBarProps) => {
  const [filterSearches, setFilterSearches] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/search/all-users"
        );
        setAllUsers(
          responseData.users.map((user) => {
            return {
              id: user.id,
              name: user.name + " " + user.surname,
            };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, [sendRequest]);

  const filterHandler = (event: any) => {
    const searchWord = event.target.value;
    const newFilter = allUsers.filter((user: any) => {
      return user.name.toLowerCase().includes(searchWord.toLowerCase());
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
    <div className={props.className}>
      <Input
        type="text"
        placeholder="Search..."
        onChange={filterHandler}
        onBlur={blurHandler}
      />
      {filterSearches.length != 0 && (
        <div className={classes.search_results}>
          {filterSearches
            .slice(0, 15)
            .map((user: { id: string; name: string }) => {
              return (
                <a href={props.redirect ? `/user/:${user.id}` : '*'} key={user.id} className={classes.search_item}>
                  <p
                    onClick={() => {
                      props.setSeachResults((prevState) => [
                        ...prevState,
                        user,
                      ]);
                      setFilterSearches([]);
                    }}
                  >
                    {user.name}
                  </p>
                </a>
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

export { SearchBarUsers, SearchBarAuto };
