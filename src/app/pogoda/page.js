"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Cloud, Wind } from 'lucide-react';
import { Minimize2 } from 'lucide-react';
import { Droplet } from 'lucide-react';

export default function Pogoda(){
    const [daneDzis, setDaneDzis] = useState(null)
    const [dane5, setDane5] = useState([])
    const [err, setErr] = useState(false)
    const [load, setLoad] = useState(true)

    var today = new Date()
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear(); 

    useEffect(()=>{
      const getData = async() =>{
        try{
          const dataDzis = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=52.17935&lon=21.57251&units=metric&appid=b6b25c78c679c8415fd7ab2defc95d8b")
          const data5 = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=52.17935&lon=21.57251&units=metric&appid=b6b25c78c679c8415fd7ab2defc95d8b")
          const dataDzisJson = await dataDzis.json()
          const data5Json = await data5.json()

          // sprawdza czy w dt_txt jest 12:00:00
          const filteredData = data5Json.list.filter(entry => entry.dt_txt.includes("12:00:00")).slice(0, 4) // 4 kolejnych dni

          setDaneDzis(dataDzisJson)
          setDane5(filteredData)
        }catch(error){
            console.log(error)
            setErr(true)
        }finally{
            setLoad(false)
        }
      }
      getData()
    },[])

    return (
        <div className="flex flex-col items-center m-10">
            <h1>{err && "błąd podczas ładowania"}</h1>
            <h1>{load && "ładowanie"}</h1>

            {/* Sekcja z dzisiejszą pogodą */}
            {daneDzis && (
                <Card className="h-30 w-90 m-1 pt-4">
                  <CardContent className="flex flex-wrap flex-col justify-center items-center">
                    <h1 className="text-2xl">{daneDzis.name}</h1>
                    <h1 className="text-3xl">{daneDzis.main.temp}℃</h1>
                    <h1 className="text-xl">{yyyy+"-"+mm+"-"+dd}</h1>
                    <h1 className="flex justify-between gap-2">
                      <Cloud/>{daneDzis.clouds.all}% | <Wind/>{daneDzis.wind.speed} m/s | <Minimize2/>{daneDzis.main.pressure} hPa | <Droplet />{daneDzis.main.humidity}%
                    </h1>
                  </CardContent>
                </Card>
            )}

            {/* Sekcja z prognozą na kolejne 4 dni */}
            <div className="flex flex-row flex-wrap justify-center mt-4">
              {dane5.length > 0 && dane5.map((forecast, idx) => {
                  // Przetwórz datę w formacie YYYY-MM-DD
                  const [date] = forecast.dt_txt.split(" ");

                  return (
                    <Card className="h-30 w-90 m-1 pt-4" key={idx}>
                      <CardContent className="flex flex-wrap flex-col justify-center items-center">
                        <h1 className="text-3xl">{forecast.main.temp.toFixed(2)}℃</h1>
                        <h1 className="text-xl">{date}</h1>
                        <h1 className="flex justify-between gap-2">
                          <Cloud/>{forecast.clouds.all}% | <Wind/>{forecast.wind.speed}m/s | <Minimize2/>{forecast.main.pressure}hPa | <Droplet />{forecast.main.humidity}%
                        </h1>
                      </CardContent>
                    </Card>
                  );
              })}
            </div>
        </div>
    )
}