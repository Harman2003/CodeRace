import axios from "axios";

export async function fetchData() {
    const response = await axios.get(
      "https://codeforces.com/api/problemset.problems",
    )
    return response;
}

