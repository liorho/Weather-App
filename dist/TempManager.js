class TempManager {
    constructor() {
        this.cityData = []
    }

    calcTimeDiff(lastUpdated) {
        lastUpdated = moment(lastUpdated)
        let now = moment()
        let diff = now.diff(lastUpdated, 'minutes')
        diff = diff % 60
        return (diff)
    }

    // Get Cities Array
    async getDataFromDB() {
        let cities = await $.get('/cities')
        if (cities) this.cityData = cities
        
        return this.cityData
    }

    async getCityData(cityName) {
        console.log(this.cityData)
        if (this.cityData) {
            let existingCity = this.cityData.some(c => (c.name).toLowerCase() === cityName.toLowerCase())


            if (!existingCity) {
                let weather = await $.get(`/city/:${cityName}`)

                let diff = this.calcTimeDiff(weather.current.last_updated)

                this.cityData.push({
                    name: weather.location.name,
                    temperature: Math.floor(weather.current.temp_c),
                    condition: weather.current.condition.text,
                    conditionIcon: weather.current.condition.icon,
                    lastUpdated: weather.current.last_updated,
                    diff: diff
                })
                this.saveCity(weather.location.name)
            }
        }


        return (this.cityData)
    }

    saveCity(cityName) {
        let city = this.cityData.find(c => c.name === cityName)

        $.ajax({
            type: "POST",
            url: "/city",
            data: city,
            success: function (response) {
                console.log(cityName + " added to DB")
            }
        })

    }

    removeCity(cityName) {
        $.ajax({
            type: "DELETE",
            url: `/city/${cityName}`,
            success: function (response) {
                console.log(cityName + " removed from DB")
            }
        })
    }

}