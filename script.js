"use strict";

$(document).on( "dblclick", "#tabela tr", function() {
    const izbrisi = confirm("Želite izbrisati kontakt?");
    if(izbrisi) (this).remove();
} );

let st = 1
function domDodajOsebo(oseba) {
    const table = document.querySelector("#tabela");
    const tr = document.createElement("tr");
    table.appendChild(tr);

    const avatar = document.createElement("img");
    avatar.src = "avatar.png";
    tr.appendChild(avatar);

    tr.setAttribute("draggable", "true");
    tr.setAttribute("ondragstart", "drag(event)");
    tr.setAttribute("ondragover", "openLid()");
    tr.setAttribute("ondragend", "closeLid()");
    tr.setAttribute("id", st);

    avatar.setAttribute("draggable", "true");
    avatar.setAttribute("ondragstart", "drag(event)");
    avatar.setAttribute("ondragover", "openLid()");
    avatar.setAttribute("ondragend", "closeLid()");
    avatar.setAttribute("id", st++);

    for (const kljuc in oseba){
        const td = document.createElement("td");
        td.innerText = oseba[kljuc];
        tr.appendChild(td);
    }
}

function dodajOsebo(event) {
    const first = document.querySelector("#first").value;
    const last = document.querySelector("#last").value;
    const addr = document.querySelector("#addr").value;
    const phone = document.querySelector("#phone").value;

    if (first == "" || last == "" || addr == "" || phone == "") {
        alert("Prosim izpolnite vsa potrebna polja!");
        return false;
    }

    const regex=/^[a-zA-ZčšžćČŠŽĆ\s]+$/;
    if (!first.match(regex) || !last.match(regex)) {
        alert("Ime in priimek lahko vsebujeta samo črke!");
        return false;
    }

    if (!phone.match(/^\d{9}$/)) {
        alert("Narobe vnesena telefonska številka!");
        return false;
    }

    if (first.length > 15 || last.length > 30){
        alert("Ime in/ali priimek sta precej dolga, ste prepičani da sta pravilno vnešena?");
        return false;
    }

    document.querySelector("#first").value = "";
    document.querySelector("#last").value = "";
    document.querySelector("#addr").value = "";
    document.querySelector("#phone").value = "";
    
    const oseba = {
        first: first,
        last: last,
        addr: addr,
        phone: phone
    };

    domDodajOsebo(oseba);

    document.getElementById("first").focus();
}

$(document).ready(function(){
    $("#searchBar").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#tabela tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    let el = document.getElementById(ev.dataTransfer.getData('Text'));
    el.parentNode.removeChild(el);
}
function openLid(){
    document.getElementById("trash").src="canopen.png";
}
function closeLid(){
    document.getElementById("trash").src="canclosed.png";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dodajButton").onclick = dodajOsebo;
})
