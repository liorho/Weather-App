
const tempManager = new TempManager
const renderer = new Renderer

const loadPage = function() {
    renderer.renderData(tempManager.getDataFromDB())

}

const handleSearch = async function() {
    let cityName = $(".city-input").val()
    let cityData = await tempManager.getCityData(cityName)
    renderer.renderData(tempManager.cityData)
}




loadPage()