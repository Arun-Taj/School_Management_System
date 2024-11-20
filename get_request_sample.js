import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

const ExampleComponent = () => {
  const { api } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/some-endpoint/"); // Replace with your actual endpoint
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [api]);

  return <div>Check the console for fetched data.</div>;
};

export default ExampleComponent;
