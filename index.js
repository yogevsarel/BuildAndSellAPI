// Your code here - hello_user will be your entry point
// Feel free to choose your own names, remember to update the field right above the editor!
const axios = require("axios")
const cheerio = require("cheerio")

const newspapers = [
    {
        name: "cityam",
        address:
            "https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/",
        base: "",
    },
    {
        name: "thetimes",
        address: "https://www.thetimes.co.uk/environment/climate-change",
        base: "",
    },
    {
        name: "guardian",
        address: "https://www.theguardian.com/environment/climate-crisis",
        base: "",
    },
    {
        name: "telegraph",
        address: "https://www.telegraph.co.uk/climate-change",
        base: "https://www.telegraph.co.uk",
    },
    {
        name: "nyt",
        address: "https://www.nytimes.com/international/section/climate",
        base: "",
    },
    {
        name: "latimes",
        address: "https://www.latimes.com/environment",
        base: "",
    },
    {
        name: "smh",
        address: "https://www.smh.com.au/environment/climate-change",
        base: "https://www.smh.com.au",
    },
    {
        name: "un",
        address: "https://www.un.org/climatechange",
        base: "",
    },
    {
        name: "bbc",
        address: "https://www.bbc.co.uk/news/science_and_environment",
        base: "https://www.bbc.co.uk",
    },
    {
        name: "es",
        address: "https://www.standard.co.uk/topic/climate-change",
        base: "https://www.standard.co.uk",
    },
    {
        name: "sun",
        address: "https://www.thesun.co.uk/topic/climate-change-environment/",
        base: "",
    },
    {
        name: "dm",
        address:
            "https://www.dailymail.co.uk/news/climate_change_global_warming/index.html",
        base: "",
    },
    {
        name: "nyp",
        address: "https://nypost.com/tag/climate-change/",
        base: "",
    },
]

function welcome() {
    return "Welcome to my Climate Change News API"
}

var articles = []

async function loadData() {
    return new Promise((resolve, reject) => {
        newspapers.forEach((newspaper, index, array) => {
            axios
                .get(newspaper.address)
                .then((response) => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    $('a:contains("climate")', html).each(function () {
                        const title = $(this).text()
                        const url = $(this).attr("href")

                        articles.push({
                            title,
                            url: newspaper.base + url,
                            source: newspaper.name,
                        })
                    })
                })
                .then(() => {
                    if (index === array.length - 1) resolve()
                })
        })
    })
}

async function news() {
    await loadData()
    return articles
}

async function newsByID(newspaperId) {
    const newspaperAddress = newspapers.filter(
        (newspaper) => newspaper.name == newspaperId
    )[0].address
    const newspaperBase = newspapers.filter(
        (newspaper) => newspaper.name == newspaperId
    )[0].base

    const response = await axios.get(newspaperAddress)
    const html = response.data
    const $ = cheerio.load(html)
    var specificArticles = []
    $('a:contains("climate")', html).each(function () {
        const title = $(this).text()
        const url = $(this).attr("href")
        specificArticles.push({
            title,
            url: newspaperBase + url,
            source: newspaperId,
        })
    })
    return specificArticles
}

