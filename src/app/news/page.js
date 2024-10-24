"use client"
import {useState,useEffect} from "react"
import { Card, CardContent,CardTitle,CardFooter,CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function News(){
    const [news,setNews] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const getData = async()=>{
            try{
                const News = await fetch("https://newsapi.org/v2/everything?q=keyword&apiKey=86cc18ada79e45e797b4e8d23b85fe5b")
                const NewsJson = await News.json()
                setNews(NewsJson.articles)
                console.log(NewsJson)
            }catch(error){
                console.log(error)
                setError(true)
            }finally{
                setLoading(false)
            }
        }
          getData()
    },[])
    return(
        <div className="flex flex-row flex-wrap w-full justify-center items-center m-10">
            <h1>{error && "error"}</h1>
            <h1>{loading && "loading..."}</h1>
            {news && news.map((item,idx)=>
                item.urlToImage ? (
                    <Card className="w-[500px] flex flex-col h-[600px] p-4 rounded-3xl" key={idx}>
                        <CardContent className="flex-grow flex flex-col justify-center items-center w-[400px] ">
                            <Image src={item.urlToImage} width={500} height={250} alt="obraz" className="h-[250px] w-[500px]" />
                        </CardContent>
                            <CardTitle>
                                <h1 className="text-2xl">{item.title}</h1>
                            </CardTitle>
                                <CardDescription>
                                    <p>{item.description}</p>
                                </CardDescription>
                            <CardFooter className="w-[100%] flex justify-end mt-auto ">
                                <Button asChild>
                                    <Link href={item.url}>Więcej</Link>
                                </Button>
                            </CardFooter>
                    </Card>
                ) : null
            )}
        </div>
    )
}
                        
            

