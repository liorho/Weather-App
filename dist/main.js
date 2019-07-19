
const tempManager = new TempManager
const renderer = new Renderer

setCursor = () => $('.city-input').focus();

const loadPage = async function() {
    let cityData = await tempManager.getDataFromDB()
    renderer.renderData(cityData.reverse()) 
}

const handleSearch = async function() {
    let cityName = $(".city-input").val()
    $('.city-input').val("");
    let cityData = await tempManager.getCityData(cityName)
    renderer.renderData(tempManager.cityData)
}

//***************************************************************/

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
    let update = await tempManager.updateCity(cityName)
    loadPage()
})

$(document).on('keypress', function (e) {
    if (e.which == 13) {
        handleSearch();
    }
});


