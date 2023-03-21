import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProblemCF from './ProblemCF/problemCF';
import Split from 'react-split'
import Editor from './Editor/Editor';
import useProblemData from './context/useProblemData';
import SubmissionCF from './submissionCF/SubmissionCF';

const ProblemPage =  () => {

  const { id } = useParams();
  const { code } = useProblemData();

  return (
    <Split
      sizes={[50,50]}
      direction="horizontal"
      className="mx-auto h-[calc(100%-40px)] w-full flex">
      <ProblemCF id={id} />
      {code ? <SubmissionCF /> : <Editor id={id}/>}
      </Split>
  );
}

export default ProblemPage
