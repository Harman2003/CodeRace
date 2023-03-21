import { useContext } from "react";
import { ProblemContext } from "./ProblemContext";

const useProblemData = () => {
  return useContext(ProblemContext);
};

export default useProblemData;
