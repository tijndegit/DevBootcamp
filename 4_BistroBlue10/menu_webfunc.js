console.log("File menu_webfunc appropriately called.")
let totalPrice = parseFloat(0) // Definieer globaal de totaalprijs.

function ComputeAmount() {
    document.getElementById("totaalbedrag").innerHTML = "" // Verwijder eventueel eerder berekend bedrag.
    var paragraph = document.createElement("p"); // Maak een tekstregel.
    var text = document.createTextNode("Te betalen: " + totalPrice.toFixed(2) + " euro"); // Definieer de tekst voor in de tekstregel.
    paragraph.appendChild(text); // Zet de text in de regel.
    var element = document.getElementById("totaalbedrag")//Pak de target div.
    element.appendChild(paragraph); // Voeg nieuwe regel toe aan target div.
}

function EmptyList() {
    document.getElementById("bonnetje").innerHTML = ""
    document.getElementById("totaalbedrag").innerHTML = ""
    totalPrice = parseFloat(0)
}


 function ListOrder() {
     document.getElementById("totaalbedrag").innerHTML = ""; // Verwijder de eerder berekende totaalprijs als bestelling wijzigt.
     var selecteddish = document.querySelector('input[name="dish"]:checked').value // Haal de geselecteerde waarde op.
     const price = String(selecteddish).split(" ").pop() // Onttrek de prijs uit de string.
     totalPrice += parseFloat(price) // Tel  de prijs van deze dish op bij totaalprijs.

     var paragraph = document.createElement("li"); // Maak een bulletpoint.
     var text = document.createTextNode(selecteddish); // Definieer de text.
     paragraph.appendChild(text); // Zet de text in de bulletpoint.
     var element = document.getElementById("bonnetje")//Pak de target div.
     element.appendChild(paragraph); // Voeg nieuwe bulletpoint toe aan target div.
 }

function getJSON() {
    fetch("https://b10bc-weu-httptriggertijn-fa.azurewebsites.net/api/GetMenu")
        .then(response => response.json())
        .then((body) => {
            console.log(body)
            for (var dish of body) {
                var menu_txt = dish.value;
                if (dish.type == "voor") {
                    document.getElementById("voor").innerHTML += "<input type = 'radio' value='"+menu_txt+"' name = "+dish.name+" id = "+menu_txt+">"
                    document.getElementById("voor").innerHTML += "<label for ='"+menu_txt+"'>"+menu_txt+"</label><br>"
                } else if (dish.type == "hoofd") {
                    document.getElementById("hoofd").innerHTML += "<input type = 'radio' value='"+menu_txt+"' name = "+dish.name+" id = "+menu_txt+">"
                    document.getElementById("hoofd").innerHTML += "<label for ='"+menu_txt+"'>"+menu_txt+"</label><br>"
                } else if (dish.type == "na") {
                    document.getElementById("na").innerHTML += "<input type = 'radio' value='"+menu_txt+"' name = "+dish.name+" id = "+menu_txt+">"
                    document.getElementById("na").innerHTML += "<label for ='"+menu_txt+"'>"+menu_txt+"</label><br>"
                } else if (dish.type == "drank") {
                    document.getElementById("drank").innerHTML += "<input type = 'radio' value='"+menu_txt+"' name = "+dish.name+" id = "+menu_txt+">"
                    document.getElementById("drank").innerHTML += "<label for ='"+menu_txt+"'>"+menu_txt+"</label><br>"
                }
            };
        });
    
}

