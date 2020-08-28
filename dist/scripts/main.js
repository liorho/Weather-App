const tempManager = new TempManager();
const renderer = new Renderer();

const loadPage = async () => {
  const cityData = await tempManager.getDataFromDB();
  renderer.renderData(cityData.reverse());
};

const handleSearch = async () => {
  const cityName = $('.city-input').val();
  $('.city-input').val('');
  await tempManager.getCityData(cityName);
  renderer.renderData(tempManager.cityData);
};

//***************************************************************

loadPage();

//************** EVENT-LISTENERS *********************************
$('.cities').on('click', '.delete-btn', function () {
  let cityName = $(this).closest('.city').find('.cityName').html().trim();
  tempManager.removeCity(cityName);
  loadPage();
});

$('.cities').on('click', '.update-btn', async function () {
  let cityName = $(this).closest('.city').find('.cityName').html().trim();
  await tempManager.updateCity(cityName);
  loadPage();
});

$(document).on('keypress', function (e) {
  if (e.which == 13) {
    handleSearch();
    $('.city-input').blur();
  }
});
