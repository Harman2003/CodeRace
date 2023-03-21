export default function row(key, problemName, index, contestId, rating) {
  return (
    <div
      key={key}
      data-tag={key}
      className="font-poppins m-1 px-2 py-1 flex items-center text-sm shadow-sm cursor-pointer transition duration-300 ease-in-out hover:scale-[1.02] delay-100"
    >
      <div className=" w-2/3 ">{`${index}. ${problemName}`}</div>

      <div className="w-1/6">{contestId}</div>

      <div className="w-1/6">
        <div
          className="w-min rounded-2xl px-2 py-1"
          style={{
            color: rating >= 1600 ? "red" : rating >= 1400 ? "blue" : "green",
            backgroundColor:
              rating >= 1600
                ? "rgb(254 226 226)"
                : rating >= 1400
                ? "rgb(191 219 254)"
                : "rgb(187 247 208)",
          }}
        >
          {rating ? rating : "-"}
        </div>
      </div>
    </div>
  )
}
