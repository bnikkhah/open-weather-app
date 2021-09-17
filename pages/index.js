import {useState, useEffect, useRef, useContext} from 'react'

import Head from 'next/head'

import Image from 'next/image'

import mapboxgl from '!mapbox-gl'

import { connect } from 'react-redux'

import useMap from '../hooks/useMap'
// import useDate from '../hooks/useDate'
import Moment from 'react-moment'

import Figure from 'react-bootstrap/Figure'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PK

const Home = (props) => {
  const {initialData, initialForecastData, query} = props
  const [data, setData] = useState(initialData)
  const [dataForecast, setForecastData] = useState(initialForecastData)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query ? query : 'Calgary'}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
        const data = await res.json()

        const resForecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${query ? query : 'Calgary'}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
        const dataForecast = await resForecast.json()

        setData(data)
        setForecastData(dataForecast)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [query])

  var chunkifiedForecast = [];
        
  for (var i = 0; i < dataForecast.list.length; i += 8){
    chunkifiedForecast.push(dataForecast.list.slice(i, i + 8));
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1 className="text-center">Today's weather for {data.name}, {data.sys.country}</h1>
      <h3 className="text-center">
        <Moment unix>
          {data.dt}
        </Moment>
      </h3>
      <div className="d-flex align-items-center justify-content-center">
        <Image
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].main}
          width={100}
          height={100}
        />
        <h2 className="mb-0">{data.weather[0].main} <span className="small">({data.weather[0].description})</span></h2>
      </div>
      { useMap(data.coord.lon, data.coord.lat) }
      <h2 className="text-center my-4">Your 5-Day Forecast for {data.name}, {data.sys.country} <span className="small">(in 3-hour)</span></h2>
      {
        chunkifiedForecast.map((day, index) => {
          return (
            <Col key={index} xs={12} className="border mb-4 p-3">
              <h3 className="text-center">Day {index + 1}</h3>
              <Row>
                {
                  day.map((forecast) => {
                    return (
                      <Col key={forecast.dt}>
                        <Figure className="text-center">
                          <Image
                            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                            alt={forecast.weather[0].main}
                            width={100}
                            height={100}
                            className="figure-image"
                          />
                          <Figure.Caption className="text-center">
                            <Moment>
                              {forecast.dt_txt}
                            </Moment>
                            <br />
                            {forecast.weather[0].main}
                          </Figure.Caption>
                        </Figure>
                      </Col>
                    )
                  })
                }
              </Row>
            </Col>
          )
        })
      }
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Calgary&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
  const data = await res.json()
  
  const resForecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Calgary&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
  const dataForecast = await resForecast.json()

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      initialData: data,
      initialForecastData: dataForecast
    }
  }
}

const mapStateToProps = (state) => {
  return {
    query: state.query
  }
}

export default connect(mapStateToProps)(Home)