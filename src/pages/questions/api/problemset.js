import axios from "axios";

export async function fetchData() {
    console.log('done')
    const response = await axios.get(
      "https://codeforces.com/api/problemset.problems",
    )
    return response.data.result.problems;
}

