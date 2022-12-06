const { parse } = require("csv-parse");
const fs = require("fs");
let res = [];

const planetLikeEarth = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

// pipe is used to connect readable stream source to writable stream source
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (d) => {
    if (planetLikeEarth(d)) res.push(d);
  })
  .on("err", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(`Number of Earth like planets-  ${res.length}`);
    res.map((result, idx) => {
      console.log(`Planet ${idx + 1} is -> ${result["kepler_name"]}`);
    });
  });
