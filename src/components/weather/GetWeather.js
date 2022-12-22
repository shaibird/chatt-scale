import { useEffect, useState } from "react"

export const GetWeather = ({ crags }) => {
    const [cragWeather, setCragWeather] = useState([])
    const api_key = "725b7899469aa9a7c3fdb66722cc4b3a"

    console.log(crags.lat)
    console.log(crags.lon)

    const FetchTheWeather = () => {
    
                 fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${crags.lat}&lon=${crags.lon}&units=imperial&appid=${api_key}`)
                    .then(response => response.json())
                    .then((data) => {
                        setCragWeather(data)
                    })

    }


    useEffect(
        () => {
            if (crags.lat) {FetchTheWeather()}
            else { console.log("I say nay!")}
        },
        [crags]
    )

    console.log(cragWeather.daily[1].weather[0].description)

    // return <>
    //     <article className="weather-data-display">
    //         {JSON.stringify(cragWeather.daily[1].weather[0].description)}
    //     </article>
    // </>





    //find icons and use a .find where if the descripton of the weather === the name of the weather value in a dictionary that I create. 
    //then display the image that is in the database.

}
