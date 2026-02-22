"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image"

import JumbohackLogo from "../../../public/Banner 7@72x.png";

type Event = {
    title: string,
    startTime: Date,
    endTime: Date,
    type: string,
    location: string,
}

export default function SaturdaySchedule() {
    const eventsRaw = useQuery(api.sunday.get);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const processedEvents = eventsRaw?.map(e => ({
            title: e.title,
            startTime: new Date(e.startTime),
            endTime: new Date(e.endTime),
            type: e.type,
            location: e.location,
        }));
        if (processedEvents) {
            setEvents(processedEvents);
        }
    }, [eventsRaw]);

    const getNext = useCallback((now: Date) => {
        let es = []
        for (const e of events) {
            if (e.startTime.getTime() - now.getTime() > 0) {
                es.push(e);
                // if (es.length == 2) { break; }
            }
        }
        return es;
    }, [events]);

    const getCurrent = useCallback((now: Date) => {
        let es = []
        for (const e of events) {
            if ((e.startTime.getTime() - now.getTime() < 0) && (e.endTime.getTime() - now.getTime() > 0)) {
                es.push(e);
                if (es.length == 2) { break; }
            }
        }
        return es;
    }, [events]);

    return (
        <div className="bg-jh-blue-300 text-jh-cream w-screen h-screen flex justify-center items-center">
            <main className="flex flex-col gap-10 items-center w-full max-w-250 h-full max-h-150">
                <Image src={JumbohackLogo.src} alt="JumboHack" width={800} height={50}/>
                <div className="flex-1 w-full flex flex-col gap-5">
                {
                    getCurrent(new Date()).map((e, i) => {
                        if (e.type === "critical") {
                            return (<div className="w-full" key={i}>
                                <div key={i} className={`flex flex-col gap-3 bg-red-400 text-jh-black p-5 rounded-xl`}>
                                    <div className="flex flex-row justify-center items-center">
                                        <p className="text-3xl font-bold">{e.title}</p>
                                    </div>
                                </div>
                            </div>)
                        } else {
                            return (<div className="w-full" key={i}>
                                <div key={i} className={`flex flex-col gap-3 bg-jh-yellow text-jh-black p-5 rounded-xl`}>
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-3xl">{e.title}</p>
                                        <p className="text-3xl">
                                            {`${e.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}-${e.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`}
                                        </p>
                                    </div>
                                    <p className="text-xl">{e.location}</p>
                                </div>
                            </div>)
                        }
                    })
                }
                {
                    getNext(new Date()).map((e, i) => {
                        if (e.type === "critical") {
                            return (<div className="w-full" key={i}>
                                <div className="flex flex-row justify-center items-center border border-red-400 rounded-sm p-1">
                                    <p className="text-2xl text-red-400">{e.title}</p>
                                </div>
                            </div>)
                        } else {
                            return (<div className="w-full" key={i}>
                                <div className="flex flex-row justify-between items-center">
                                    <p className="text-2xl">{e.title}</p>
                                    <p className="text-2xl">
                                        {`${e.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}-${e.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`}
                                    </p>
                                </div>
                            </div>)
                        }
                    })
                }
                </div>
            </main>
        </div>
    )
}
