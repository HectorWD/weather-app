import { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'

import { BsSearch } from 'react-icons/bs'
import Weather from '../components/Weather'
import LoadingSpinner from '../components/LoadingSpinner'
export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(urlApi).then((res) => {
      setWeather(res.data);
    })
    setCity('');
    setLoading(false)
  }
  if (loading) {
    return <LoadingSpinner />
  } else {
    return (
      <div>
        <Head>
          <title>Weather App</title>
          <meta name="Weather App" content="Information about tha weather" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/*Overlay */}
        <div className='absolute top-0 bottom-0 left-0 z-[1] w-full bg-black/40 ' />

        {/*Background Image*/}
        <Image
          src={`https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80`}
          layout='fill'
          className='object-cover'
        />

        {/*Search*/}
        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10 '>
          <form
            onSubmit={fetchWeather}
            className='flex items-center justify-between w-full p-3 m-auto text-white bg-transparent border border-gray-300 rounded-xl'
          >
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className='text-2xl text-white bg-transparent border-none focus:outline-none placeholder:text-white'
                type={'text'} placeholder='Search city' />
            </div>
            <button type='submit'>
              <BsSearch size={20} />
            </button>
          </form>
        </div>
        {/*Weather Section */}
        {weather.main && <Weather data={weather} />}
      </div>
    )
  }
}
