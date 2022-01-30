const API_key = "a59ab3f9-0f86-4bfe-bd6e-dcc228fe20eb"
const baseUrl = "https://api.thecatapi.com/v1/images/search"

const prevButton = document.querySelector("#prev")
const nextButton = document.querySelector("#next")
const currentPage = document.querySelector("h2")
const contentGrid = document.getElementById("content-grid")


let page = 0;
let limit = 12;
let order = "asc"



function buttonState(disabled) {

    nextButton.disabled = disabled
    prevButton.disabled = disabled

}

prevButton.addEventListener("click", function () {
    page--
    currentPage.textContent = `Showing page: ${page}`
    showCats()
})


nextButton.addEventListener("click", function () {
    page++
    currentPage.textContent = `Showing page: ${page}`
    showCats()
})


async function showCats() {


    buttonState(true)
    const url = new URL(baseUrl)
    url.searchParams.append('page', page)
    url.searchParams.append('limit', limit)
    url.searchParams.append('order', order)
    currentPage.textContent = `Showing page: ${page}`;
    contentGrid.textContent = "Loading.."

    try {
        const response = await fetch(url, { headers: { "x-api-key": API_key, }, });
        const data = await response.json()
        getCats(data)

    }
    catch (err) {
        contentGrid.textContent = "Something went wrong while fetching data from the server";

    }
    finally {
        buttonState(false)
        prevButton.disabled = page == 0
    }
}



function getCats(data) {

    contentGrid.textContent = null

    for (let i = 0; i < data.length; i++) {
        const img = document.createElement("img")
        img.src = data[i].url

        contentGrid.append(img)

    };
}

showCats()



