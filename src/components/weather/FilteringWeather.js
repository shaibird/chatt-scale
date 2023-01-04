import { WiDaySunny } from "weather-icons-react";
import { WiDayCloudy } from "weather-icons-react";
import { WiSnow } from "weather-icons-react"
import { WiDayCloudyHigh } from "weather-icons-react";
import { WiDayShowers } from "weather-icons-react"
import { WiRain } from "weather-icons-react"
import { WiStormShowers } from "weather-icons-react"
import { WiCloudy } from "weather-icons-react";
import { WiNightRainMix } from "weather-icons-react";
import { WiDayRain } from "weather-icons-react";
import { WiRaindrop } from "weather-icons-react";
import { WiCloud } from "weather-icons-react";

export const getWeatherIcon = (description) => {
    if (description === 'clear sky') {
      return <WiDaySunny size={50} color="#3c6e71" />;
    } else if (description === 'few clouds') {
      return <WiDayCloudy size={50} color="#3c6e71" />;
    } else if (description === 'scattered clouds') {
      return <WiCloudy size={50} color="#3c6e71" />;
    } else if (description === 'broken clouds') {
      return <WiDayCloudyHigh size={50} color="#3c6e71" />;
    } else if (description === 'shower rain') {
      return <WiDayShowers size={50} color="#3c6e71" />;
    } else if (description === 'rain') {
      return <WiRain size={50} color="#3c6e71" />;
    } else if (description === 'thunderstorm') {
      return <WiStormShowers size={50} color="#3c6e71" />;
    } else if (description === 'snow') {
      return <WiSnow size={50} color="#3c6e71" />;
    } else if (description === 'mist') {
      return <WiNightRainMix size={50} color="#3c6e71" />;
    } else if (description === 'moderate rain') {
        return <WiRaindrop size={50} color="#3c6e71" />;
      } else if (description === 'light rain') {
        return <WiDayRain size={50} color="#3c6e71" />;
      } else if (description === 'heavy intensity rain') {
        return <WiRain size={50} color="#3c6e71" />;
      } else if (description === 'overcast clouds') {
        return <WiCloud size={50} color="#3c6e71" />;
      } else if (description === 'very heavy rain') {
        return <WiRain size={50} color="#3c6e71" />;
      } else if (description === 'extreme rain') {
        return <WiRain size={50} color="#3c6e71" />;
      }
  }

  export const getWindDirection = (degree) => {
      if (degree >= 337.5 || degree < 22.5) {
        return 'N';
      } else if (degree >= 22.5 && degree < 67.5) {
        return 'NE';
      } else if (degree >= 67.5 && degree < 112.5) {
        return 'E';
      } else if (degree >= 112.5 && degree < 157.5) {
        return 'SE';
      } else if (degree >= 157.5 && degree < 202.5) {
        return 'S';
      } else if (degree >= 202.5 && degree < 247.5) {
        return 'SW';
      } else if (degree >= 247.5 && degree < 292.5) {
        return 'W';
      } else if (degree >= 292.5 && degree < 337.5) {
        return 'NW';
      }
    }

export const getWindDescription = (speed) => {
      if (speed < 5) {
        return 'Light winds';
      } else if (speed >= 5 && speed < 15) {
        return 'Moderate winds';
      } else if (speed >= 15 && speed < 25) {
        return 'Strong winds';
      } else {
        return 'Very strong winds';
      }
    }

export const getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.toLocaleString('default', { weekday: 'long' });
    return `${day}, ${"\n"} ${month} ${date.getDate()}`;
  }