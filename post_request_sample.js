import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";

const PostExampleComponent = () => {
  const { api } = useContext(AuthContext);
  const [data, setData] = useState({}); // Data to send

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/some-endpoint/", data); // Replace with your actual endpoint
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter some data"
        onChange={(e) => setData({ ...data, field: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostExampleComponent;
