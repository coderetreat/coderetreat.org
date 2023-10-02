import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap";
import jquery from "jquery/dist/jquery";
import "popper.js/dist/esm/popper";

window.$ = jquery;

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
