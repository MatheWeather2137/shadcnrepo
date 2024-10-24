"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "@/components/ui/sheet"

export default function Cats() {
    const [cats, setCats] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
                const data = await response.json();
                setCats(data);
                console.log(data);
            } catch (err) {
                setError(true);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <div className="flex flex-wrap gap-2 justify-center items-center p-2">
            {error && <h1>Error loading cats</h1>}
            {loading && <h1>Loading...</h1>}
            {cats && cats.map((item, idx) => (
                <Card key={idx} className="h-[350px] w-[350px] flex justify-center items-center">
                    <CardContent>
                    <Sheet>
                    <SheetTrigger>
                    <Image src={item.url} width={500} height={250} alt="obraz" className="h-[200px] w-[200px]"/>
                    <h1>Click at photo</h1>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="flex items-center flex-col justify-center h-[90%]">
                            <h1>LOOK AT ME!!!!!</h1>
                        <Image src={item.url} width={500} height={250} alt="obraz"/>
                    </SheetContent>
                    </Sheet>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
