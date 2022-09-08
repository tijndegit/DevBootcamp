console.log("File menu_text appropriately called.")
let menukaart = [
    {"id": "dish1", "name": "dish", "type": "voor", "value":"Smoked Salmon 6.25"},
    {"id": "dish2", "name": "dish", "type": "voor", "value":"Carrot Soup 3.55"},
    {"id": "dish3", "name": "dish", "type": "hoofd", "value":"Chicken Balerno 9.35"},
    {"id": "dish4", "name": "dish", "type": "hoofd", "value":"Roast Beef 10.06"},
    {"id": "dish5", "name": "dish", "type": "hoofd", "value":"Pizza Americana 10.20"},
    {"id": "dish6", "name": "dish", "type": "na", "value":"Chocolate Gateau 4.05"},
    {"id": "dish7", "name": "dish", "type": "na", "value":"Chocolate Cake 4.49"},
    {"id": "dish8", "name": "dish", "type": "na", "value":"Coffee and Mints 2.50"},
    {"id": "dish9", "name": "dish", "type": "drank", "value":"Margarita Lemon 7.11"},
    {"id": "dish10", "name": "dish", "type": "drank", "value":"Cosmopolitan 7.99"},
    {"id": "dish11", "name": "dish", "type": "drank", "value":"Moscow Mule 3.90"},
    {"id": "dish12", "name": "dish", "type": "drank", "value":"Long Island Ice Tea 8.43"}
]

for (var dish of menukaart) {
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
}
