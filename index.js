const API_key = "a59ab3f9-0f86-4bfe-bd6e-dcc228fe20eb"
const baseUrl = "https://api.thecatapi.com/v1/images/search"




const prevButton = document.querySelector("#prev")
const nextButton = document.querySelector("#next")
let page = 0;
let limit = 12;
let order = "asc"

function deleteCats() {

    document.getElementById("contentGrid").remove()

}



function buttonState() {
    if (page == 0) {
        prevButton.disabled = true
    }
    else { prevButton.disabled = false }

}

prevButton.addEventListener("click", function () {
    page--
    deleteCats()
    getCat()
})


nextButton.addEventListener("click", function () {
    page++
    console.log("i clicked")
    deleteCats()
    getCat()



})

function getCat() {

    buttonState(true)
    let url = new URL(baseUrl)
    url.searchParams.append('page', page)
    url.searchParams.append('limit', limit)
    url.searchParams.append('order', order)


    fetch(url, { headers: { "x-api-key": API_key, } })
        .then(response => response.json())
        .then(data => {
            const contentGrid = document.createElement("div")

            contentGrid.setAttribute("id", "contentGrid")
            const container = document.getElementById("container")

            for (let i = 0; i < data.length; i++) {
                const img = document.createElement("img")
                img.src = data[i].url

                contentGrid.appendChild(img)



            };
            container.appendChild(contentGrid)
        });



};
getCat()




