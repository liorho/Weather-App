
const tempManager = new TempManager
const renderer = new Renderer

$(document).on('keypress', function (e) {
    if (e.which == 13) {
        handleSearch();
    }
});

setCursor = () => $('.city-input').focus();

const loadPage = async function() {
    let cityData = await tempManager.getDataFromDB()
    console.log(cityData)
    renderer.renderData(cityData)

}

const handleSearch = async function() {
    $('.city-input').val("");
    let cityName = $(".city-input").val()
    let cityData = await tempManager.getCityData(cityName)
    renderer.renderData(tempManager.cityData)
}





setCursor()
loadPage()


$(".cities").on("click", ".city", function(){

    renderer.renderDelete()

})

const deleteCity = function(){
    console.log("DELETE")
}