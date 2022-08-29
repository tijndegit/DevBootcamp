// Load libraries. fs reads files, prompt allows asking questions.
const fs = require('fs')
const prompt = require('prompt-sync')();

// Load the file and prepare the menu.
let rawfood = fs.readFileSync('./menu.json');
let menu = JSON.parse(rawfood);

// Prepare a fresh, empty bill.
let TotalPrice = 0
let Order = []

// Declare some customer characteristics to start with.
let firsthelp = false
let satisfied = false

// Take the order.
while (firsthelp == false) {
    const SeeMenu = prompt("Would you like to see the menu? (Y/N) ")

    //Response if customer wants to see the menu.
    if (SeeMenu.toUpperCase() == 'Y') {
        console.log("\n")
        for (let i = 0; i < menu.length; i++) {
            console.log(menu[i].id + ": " + menu[i].Dish + "   \t€" + menu[i].Price)

        }

        // Now ask if the customer wishes to order.
        while (satisfied == false) {
            const Hungry = prompt("Would you like to order anything? (Y/N) ")
            if (Hungry.toUpperCase() == 'Y') {
                // The customer is hungry and orders items until satisfied.
                let isitem = false

                while (isitem == false) {
                    const OrderedDish = prompt("Please type the number of the menu item (0-10): ")
                    if (OrderedDish >= 0 && OrderedDish <= (menu.length - 1)) {
                        // The customer has ordered a valid item of the menu.
                        let correct = false

                        while (correct == false) {
                            const CorrectOrder = prompt(`You have ordered ${menu[OrderedDish].Dish}, correct? (Y/N) `)
                            if (CorrectOrder.toUpperCase() == 'Y') {
                                // The order is correct. Add it to the bill and ask for more.

                                Order += String(menu[OrderedDish].id + ": " + menu[OrderedDish].Dish + "   \t€" + menu[OrderedDish].Price + "\n")
                                TotalPrice += Number(menu[OrderedDish].Price)
                                console.log('\x1b[32m%s\x1b[0m', `${menu[OrderedDish].Dish} added to bill!`)
                                correct = true

                            } else if (CorrectOrder.toUpperCase() == 'N') {
                                // The order is incorrect. Cancel it and try to take the order again.
                                console.log('\x1b[31m%s\x1b[0m', `Order of ${menu[OrderedDish].Dish} cancelled.`)
                                correct = true

                            } else {
                                // It is unclear whether the order is correct. Ask again.
                                console.log('\x1b[41m%s\x1b[0m', "I did not understand your answer. Please answer 'Y' or 'N'.")
                            }
                        }
                        isitem = true

                    } else {
                        // The ordered item is not on the menu. Ask again.
                        console.log('\x1b[41m%s\x1b[0m', "This is not a menu item. Please insert a number from 0-10.")
                    }
                }
            } else if (Hungry.toUpperCase() == 'N' && TotalPrice == 0) {
                // The customer does not want to order anything.
                console.log("OK, no problem. See you next time!")
                satisfied = true

            } else if (Hungry.toUpperCase() == 'N') {
                // Print the bill.
                console.log(`\nThis is your order:\n\n${Order}`)
                console.log('\x1b[33m%s\x1b[0m', `Amount to pay: \t\t€${TotalPrice}\n`)
                satisfied = true

            } else {
                // It is unclear whether the customer wishes to order anything.
                console.log('\x1b[41m%s\x1b[0m', "I did not understand your answer. Please answer 'Y' or 'N'.")
                continue
            }
        }

        firsthelp = true

    } else if (SeeMenu.toUpperCase() == 'N') {
        // The customer does not want to see the menu.
        console.log("OK, no problem. See you next time!")
        firsthelp = true

    } else {
        // It is unclear whether the customer wishes to see the menu.
        console.log('\x1b[41m%s\x1b[0m', "I did not understand your answer. Please answer 'Y' or 'N'.")
        continue
    }
}

console.log('\x1b[42m%s\x1b[0m', "Thanks for coming to our restaurant!")