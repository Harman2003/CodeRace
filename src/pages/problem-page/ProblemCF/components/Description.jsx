import React from "react";
import axios from "../../../../setup/api/axios";
import { useQuery } from "react-query";

const Description = ({id}) => {
    
    const storedValue = JSON.parse(localStorage.getItem("problemPage"));
     
    const { data } = useQuery("problemPage", async () => {
        if (storedValue?.id === id) return;
    const response = await axios.get(
      `http://localhost:3000/api/problems/${id}`
    );
    const htmlData = response.data;
    localStorage.setItem(
      "problemPage",
      JSON.stringify({ html: htmlData, id: id })
    );
    return response.data;
  });

    if (storedValue?.id === id) {
      return (
        <iframe
          className="overflow-scroll scrollbar-none flex-grow"
          srcDoc={storedValue.html}
          width={"100%"}
          height={"100%"}
        ></iframe>
      )
    }
    else{
        
        return <h1>Loading...</h1>;
    }
}

export default Description;
