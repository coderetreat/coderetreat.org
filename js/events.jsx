import { Fragment, render, h } from "preact";
import { useState, useEffect } from 'preact/hooks';
import 'regenerator-runtime/runtime';
import EventCard from "./events/EventCard";

const Events = () => {
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        const Run = async () => {
            const result = await fetch("/events/events.json")
            setEventList(Object.values(await result.json()))
        }
        Run()
    }, []);

    return (
        <Fragment>
            <div class="jumbotron jumbotron-fluid m-0 p-0">
                <div class="container" style="line-height: 200%;align-content: ;">
                    <h1 style="line-height: 3;font-size: 3rem;font-weight: 900;font-family: &quot;Arial Black&quot;, Helvetica;">I'm
                        based in <select>
                            <option>cyberspace</option>
                        </select>.<br/> My Timezone is <select>
                            <option>UTC-1</option>
                        </select>. <br/>I want to attend an event that starts at <select>
                            <option>9:00 AM</option>
                        </select>
                    </h1>
                    <button>9 virtual events found</button>
                    <button>10 on-site events found</button>
                </div>
            </div>
            <div class="bg-light text-dark py-5">
                <div style="overflow-x: scroll; white-space: nowrap;">
                    <div style="display: inline-block">
                        {eventList.map(e => <EventCard event={e}/>)}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

render(
    <Events />,
    document.querySelector("#events")
);
