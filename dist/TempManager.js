class TempManager {
    constructor() {
        this.cityData = []
    }

    calcTimeDiff(lastUpdated) {
        let diff = moment().diff(moment(lastUpdated), 'minutes')
        diff < 0 ? diff = -diff : null
        diff = diff % 60
        return (diff)
    }

    // Get Cities Array
    async getDataFromDB() {
        let cities = await $.get('/cities')
        if (cities) this.cityData = cities
        return this.cityData
    }

    // Get City Data & Save on DB
    async getCityData(cityName) {
        let weather = await $.get(`/city/:${cityName}`)
        let existingCity = this.cityData.some(c => (c.name).toLowerCase() === weather.location.name.toLowerCase())
        if (!existingCity) {
            let diff = this.calcTimeDiff(weather.current.last_updated)
            this.cityData.unshift({
                name: weather.location.name,
                temperature: Math.floor(weather.current.temp_c),
                condition: weather.current.condition.text,
                conditionIcon: weather.current.condition.icon,
                lastUpdated: weather.current.last_updated,
                diff: diff
            })
            this.saveCity(weather.location.name)
        } else console.log(`${weather.location.name} (you typed "${cityName}") is already in the DB`)
        return (this.cityData)
    }

    saveCity(cityName) {
        let city = this.cityData.find(c => c.name === cityName)

        $.ajax({
            type: "POST",
            url: "/city",
            data: city,
            success: response => console.log(cityName + "was added to DB")
        })
    }

    removeCity(cityName) {
        $.ajax({
            type: "DELETE",
            url: `/city/${cityName}`,
            success: response => console.log(cityName + "was removed from DB")
        })
    }

    async updateCity(cityName) {
        let weather = await $.get(`/city/:${cityName}`)
        let diff = this.calcTimeDiff(weather.current.last_updated)
        let newWeather = {
            name: weather.location.name,
            temperature: Math.floor(weather.current.temp_c),
            condition: weather.current.condition.text,
            conditionIcon: weather.current.condition.icon,
            lastUpdated: weather.current.last_updated,
            diff: diff
        }
        $.ajax({
            type: "PUT",
            url: `/city`,
            data: newWeather,
            success: response => console.log(cityName + "was updated")
        })
    }
}