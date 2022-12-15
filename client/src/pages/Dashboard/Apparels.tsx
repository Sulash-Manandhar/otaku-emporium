import React, { useEffect } from "react";
import axios from "axios";
import api from "../../routes/api";

const Apparels = () => {
  useEffect(() => {
    axios
      .get(api.logged_user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return <div>Apparels</div>;
};

export default Apparels;
