class TempManager {
    constructor() {
        this.cityData = []
    }

    // Get Cities Array
    getDataFromDB() {
        $.get('/cities', function (cities) {
            if (cities) this.cityData = cities
            return this.cityData
        })
    }

    async getCityData(cityName) {
        let weather = await $.get(`/city/:${cityName}`)
            this.cityData.push({
            cityName: weather.location.name,
            temperature: weather.current.temp_c,
            condition: weather.current.condition.text,
            conditionIcon: weather.current.condition.icon,
            lastUpdated: weather.current.last_updated
        })
            return(this.cityData)
    }

    saveCity(cityName){
        let city = this.cityData.find(c => c.cityName = cityName)

        $.ajax({
            type: "POST",
            url: "/city",
            data: city,
            success: function (response) {
                console.log(cityName + " added to DB")
            }
        })

    }

    removeCity(cityName){
        $.ajax({
            type: "DELETE",
            url: `/city/${cityName}`,
            success: function (response) {
                console.log(cityName + " removed from DB")
            }
        })
    }

}