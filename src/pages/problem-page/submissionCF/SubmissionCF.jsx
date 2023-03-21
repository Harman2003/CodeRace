import React from 'react'
import useProblemData from '../context/useProblemData';
import { Link } from 'react-router-dom';

const SubmissionCF = () => {
    const { code , setCode} = useProblemData();
  return (
    <div className="h-full flex flex-col">
      <div className="h-11 pt-2">
        <Link to="./">
          <button onClick={()=>setCode(null)}>Back</button>
        </Link>
      </div>
      <iframe
        // className="overflow-scroll scrollbar-none flex-grow "
        srcDoc={code}
        width={"100%"}
        height={"100%"}
      ></iframe>
    </div>
  );
}

export default SubmissionCF
