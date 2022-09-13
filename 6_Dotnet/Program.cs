using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DotnetMenu
{
    class Program
    {
        public static decimal TotalPrice = 0;
        public static string OrderTicket = "Nr.\tDish\t\t\tPrice";

        static void Main(string[] args)
        {
            string MenuLength = (MenuContents.FullMenu.Count - 1).ToString();
            Console.WriteLine("Welcome to the DotNET restaurant!\n\nWould you like to see the menu? (Y/N)");
            string SeeMenu = Console.ReadLine().ToUpper();
            while (SeeMenu != "Y" && SeeMenu != "N")
            {
                // Ask again.
                Console.WriteLine("\nI did not understand your answer. Please answer with 'Y' or ''N'.\n\nWould you like to see the menu? (Y/N)");
                SeeMenu = Console.ReadLine().ToUpper();
            }
            if (SeeMenu == "N")
            {
                // Customer wants no menu. Say goodbye.
                Console.WriteLine("\nOK, no problem. See you next time!");
            }
            else if (SeeMenu == "Y")
            {
                // Customer wants menu. Show menu to customer.
                MenuActions.WriteMenu();

                // Assume that a customer's hunger upon entry is not satisfied
                bool satisfied = false;
                while (satisfied == false)
                {
                    // Check whether customer is indeed hungry.
                    Console.WriteLine("\nWould you like to order anything? (Y/N)");
                    string Hungry = Console.ReadLine().ToUpper();

                    while (Hungry != "Y" && Hungry != "N")
                    {
                        // Ask again.
                        Console.WriteLine("\nI did not understand your answer. Please answer with 'Y' or ''N'.\n\nWould you like to order anything? (Y/N)");
                        Hungry = Console.ReadLine().ToUpper();
                    }
                    if (Hungry == "N" && TotalPrice == 0)
                    {
                        // Customer not hungry. Say goodbye.
                        Console.WriteLine("\nOK, no problem. See you next time!");
                        satisfied = true;
                    }
                    else if (Hungry == "Y")
                    {
                        // Customer is hungry. Take order.
                        //Console.WriteLine($"\nPlease type the number of the menu item (0-{MenuLength}): ");
                        //string itemno = Console.ReadLine();
                        //int itemint; bool enteredint = int.TryParse(itemno, out itemint);
                        Console.WriteLine($"\nPlease type the number of the menu item (0-{MenuLength}): ");
                        string itemno = Console.ReadLine();
                        int itemint; bool enteredint = int.TryParse(itemno, out itemint);

                        while(enteredint == false || itemint > int.Parse(MenuLength) || itemint < 0)
                        {
                            Console.WriteLine($"\nThis is not a valid menu item. Please insert an integer from 0 to {MenuLength}.");
                            itemno = Console.ReadLine();
                            enteredint = int.TryParse(itemno, out itemint);
                        }
                        
                        var ordereddish = new OrderLine(itemint);
                        Console.WriteLine($"\nYou have ordered {ordereddish.ordername}. Is this correct? (Y/N)");
                        string Correct = Console.ReadLine().ToUpper();
                        while (Correct != "Y" && Correct != "N")
                        {
                            // Ask again.
                            Console.WriteLine($"\nI did not understand your answer. Please answer with 'Y' or ''N'.\n\nYou have ordered {ordereddish.ordername}. Is this correct ? (Y/N)");
                            Correct = Console.ReadLine().ToUpper();
                        }
                        if (Correct == "N")
                        {
                            // Customer not hungry. Say goodbye.
                            Console.WriteLine($"\nSorry. Order of {ordereddish.ordername} is cancelled.");
                        }
                        else if (Correct == "Y")
                        {
                            Console.WriteLine($"\nOrder of {ordereddish.ordername} confirmed!");
                            OrderTicket += ordereddish.entry;
                            TotalPrice += ordereddish.price;
                        }  
                    } 
                    else
                    {
                        Console.WriteLine($"\nPerfect. This is your order:\n\n{OrderTicket}");
                        Console.WriteLine($"\nTotal amount to pay:\t\t{TotalPrice} euros");
                        satisfied = true;
                    }
                }
            }
        }
    }

    

    public class MenuItems
    {
        [JsonPropertyName("id")] public int dishid { get; set; }

        [JsonPropertyName("Dish")] public string dishname { get; set; }

        [JsonPropertyName("Price")] public decimal price { get; set; }


    }

    public class MenuContents
    {
        public static string menutext = File.ReadAllText(@"C:\Dev\devbootcamp\6_Dotnet\menu.json");
        public static List<MenuItems> FullMenu = JsonSerializer.Deserialize<List<MenuItems>>(menutext);
    }
    
    public class MenuActions
    {
        


        public static void WriteMenu()
        {
            Console.WriteLine("Nr.\tDish\t\t\tPrice");
            foreach (var item in MenuContents.FullMenu)
            {
                Console.WriteLine($"{item.dishid}\t{item.dishname}       \t{item.price}");
            }
        }
    }

    public class OrderLine
    {
      //  public static string menutext = File.ReadAllText(@"C:\Dev\devbootcamp\6_Dotnet\menu.json");
      //  public static List<MenuItems> FullMenu = JsonSerializer.Deserialize<List<MenuItems>>(menutext);

        public string entry;
        public decimal price;
        public string ordername;

        public OrderLine(int itemno)
        {
            this.entry = $"\n{MenuContents.FullMenu[itemno].dishid}\t{MenuContents.FullMenu[itemno].dishname}       \t{MenuContents.FullMenu[itemno].price}";
            this.price = MenuContents.FullMenu[itemno].price;
            this.ordername = MenuContents.FullMenu[itemno].dishname;
        }

    }
}
