"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CornerLeftDown,CornerRightUp } from 'lucide-react'

export default function Home() {
  const [dane, setDane] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const dataR = await fetch("https://api.nbp.pl/api/cenyzlota/last/30/?format=json")
        const dataJson = await dataR.json()
        setDane(dataJson)  // Przechowujemy dane w naturalnej kolejności
      } catch (error) {
        console.error(error);
      } 
    }
    getData()
  }, [])

  return (
    <div className="flex flex-row flex-wrap justify-center m-10">
      {dane.length > 0 && dane.map((item, idx) => {
        const reversedIdx = dane.length - 1 - idx; // Indeksowanie od końca, aby odwrócić kolejność wyświetlania
        const current = dane[reversedIdx]; // Bieżący element w odwróconej kolejności
        const prev = dane[reversedIdx - 1]; // Poprzedni element w odwróconej kolejności
        
        return (
          <Card className="h-28 w-64 m-1 pt-4" key={reversedIdx}>
            <CardContent>
              {prev && current.cena > prev.cena ? ( // Porównanie względem poprzedniego elementu
                <CornerRightUp className="text-green-500 float-right size-16" />
              ) : prev && current.cena < prev.cena ? (
                <CornerLeftDown className="text-red-500 float-right size-16" />
              ) : null}
              <h1 className="text-3xl">{current.cena}</h1>
              <h1 className="text-xl">{current.data}</h1>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
