import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar/navbar";
import Landing from "./pages/landing-page/landing";
import Problems from "./pages/problems/problems";
import ProblemPage from "./pages/problem-page/ProblemPage";
import VerifyAuth from "./setup/VerifyAuth";
import NotFound from "./pages/not-found/NotFound";
import Profile from "./pages/profile-page/profile";
import PostPage from "./pages/posts/PostPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProblemProvider } from "./pages/problem-page/context/ProblemContext";
import Contest from "./pages/contests/Contest";

function App() {
  const client = new QueryClient();
  return (
    <div className="App h-screen font-NunitoSans bg-gray-50">
      <QueryClientProvider client={client}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing current={false} />} />
          <Route path="/signup" element={<Landing current={false} />} />
          <Route path="/login" element={<Landing current={true} />} />
          <Route element={<VerifyAuth/>}>
            <Route path="/profile/:id" element={<Profile current={false} />} />
          </Route>
          <Route path="/social/*" element={<PostPage/>}/>
          <Route path="/contests/*" element={<Contest/>}/>
          <Route path="/problems">
            <Route index element={<Problems />} />
            <Route path=":id/*" element={<ProblemProvider><ProblemPage /></ProblemProvider>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
