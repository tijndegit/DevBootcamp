console.log("File menu_website appropriately called.")
let totalPrice = parseFloat(0) // Definieer globaal de totaalprijs.
function ListOrder() {
    document.getElementById("totaalbedrag").innerHTML = "" // Verwijder de eerder berekende totaalprijs als bestelling wijzigt.
    var selecteddish = document.querySelector('input[name="dish"]:checked').value // Haal de geselecteerde waarde op.
    const price = String(selecteddish).split(" ").pop() // Onttrek de prijs uit de string.
    totalPrice += parseFloat(price) // Tel  de prijs van deze dish op bij totaalprijs.

    var paragraph = document.createElement("li"); // Maak een bulletpoint.
    var text = document.createTextNode(selecteddish); // Definieer de text.
    paragraph.appendChild(text); // Zet de text in de bulletpoint.
    var element = document.getElementById("bonnetje")//Pak de target div.
    element.appendChild(paragraph); // Voeg nieuwe bulletpoint toe aan target div.
}
function ComputeAmount() {
    document.getElementById("totaalbedrag").innerHTML = "" // Verwijder eventueel eerder berekend bedrag.
    var paragraph = document.createElement("p"); // Maak een tekstregel.
    var text = document.createTextNode("Te betalen: €" + totalPrice.toFixed(2)); // Definieer de tekst voor in de tekstregel.
    paragraph.appendChild(text); // Zet de text in de regel.
    var element = document.getElementById("totaalbedrag")//Pak de target div.
    element.appendChild(paragraph); // Voeg nieuwe regel toe aan target div.
}

function EmptyList() {
    document.getElementById("bonnetje").innerHTML = ""
    document.getElementById("totaalbedrag").innerHTML = ""
    totalPrice = parseFloat(0)
}


function ListOrder2() {
    document.getElementById("totaalbedrag2").innerHTML = "" // Verwijder de eerder berekende totaalprijs als bestelling wijzigt.
    var selecteddish = document.querySelector('input[name="dish2"]:checked').value // Haal de geselecteerde waarde op.
    document.getElementById("tests").innerHTML += "ouleh"
    const price = String(selecteddish).split(" ").pop() // Onttrek de prijs uit de string.
    totalPrice += parseFloat(price) // Tel  de prijs van deze dish op bij totaalprijs.

    var paragraph = document.createElement("li"); // Maak een bulletpoint.
    var orderedtext = document.createTextNode(selecteddish); // Definieer de text.
    paragraph.appendChild(orderedtext); // Zet de text in de bulletpoint.
    var element = document.getElementById("bonnetje")//Pak de target div.
    element.appendChild(paragraph); // Voeg nieuwe bulletpoint toe aan target div.
}






