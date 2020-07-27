
const tempManager = new TempManager
const renderer = new Renderer

setCursor = () => $('.city-input').focus();

loadPage = async () => {
    const cityData = await tempManager.getDataFromDB()
    renderer.renderData(cityData.reverse())
}

handleSearch = async () => {
    const cityName = $(".city-input").val()
    $('.city-input').val("");
    await tempManager.getCityData(cityName)
    renderer.renderData(tempManager.cityData)
}

//***************************************************************

setCursor()
loadPage()

//************** EVENT-LISTENERS *********************************
$(".cities").on("click", ".delete-button", function(){
    let cityName = $(this).closest(".city").find(".cityName").html()
    tempManager.removeCity(cityName)
    loadPage()
})

$(".cities").on("click", ".update-button", async function(){
    let cityName = $(this).closest(".city").find(".cityName").html()
    console.log(cityName)
    await tempManager.updateCity(cityName)
    loadPage()
})

$(document).on('keypress', function (e) {
    if (e.which == 13) {
        handleSearch();
    }
});


