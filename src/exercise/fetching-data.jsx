import React, { useEffect, useState } from "react";
const API_RANDOM_ULR = "https://randomuser.me/api/";
const FetchData = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(API_RANDOM_ULR);
      const data = await res.json();
      setUser(data.results[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <h1>Fetching data ....</h1>;

  return (
    <div>
      <h1>Hello, worlds</h1>
      <h2>
        👤 {user.name.title} {user.name.first} {user.name.last}
      </h2>
      <h3> 📧 {user.email}</h3>
      <img alt={user.name.first} src={user.picture.large}></img>
      <br></br>
      <br></br>
      <button
        onClick={() => {
          fetchUser();
        }}
      >
        Get me another one!
      </button>
    </div>
  );
};

export default FetchData;
