const axios = require("axios");
const cheerio = require("cheerio");

async function getListOfAdsFromOglasnik(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const listOfAds = $("#classifieds-list a")
      .get()
      .map(el => ({
        title: $("h3.classified-title", el).text(),
        price: $("span.price-kn", el).text(),
        info: $("div.info-wrapper", el)
          .text()
          .replace(/  +/g, " ")
          .replace(/\n/g, " "),
        link: $(el).attr("href"),
        image: `https://www.oglasnik.hr${$("div.image-wrapper", el).data(
          "src"
        )}`,
        createdDate: $("span.date", el).text()
      }));
    return listOfAds;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getListOfAdsFromOglasnik;
