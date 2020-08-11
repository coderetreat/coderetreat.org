import { render, h } from "preact";
export default ({event}) => (

<div class="card m-3" style="width: 18rem;  white-space: normal;">
    <div class="card-body">
        <h5 class="card-title">{event.title}</h5>
        <p class="card-text">{event.description}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">{event.format}</li>
        <li class="list-group-item">{event.spoken_language}</li>
        <li class="list-group-item">{event.location}</li>
    </ul>
    <div class="card-body">
        <a href="#" class="card-link">{event.url}</a>
        <a href="#" class="card-link">{event.moderators}</a>
    </div>
</div>
);