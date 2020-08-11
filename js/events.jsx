import { Fragment, render, h } from "preact";

const Events = () => (
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
            <button>9 virtual events found</button><button>10 on-site events found</button>
        </div>
    </div>
    <div class="bg-light text-dark py-5">
        <div style="overflow-x: scroll; white-space: nowrap;">
            <div style="display: inline-block">

                <div class="card m-3" style="width: 18rem;  white-space: normal;">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Fragment>
);

render(
    <Events />,
    document.querySelector("#events")
);
