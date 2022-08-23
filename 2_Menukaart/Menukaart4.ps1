$menu = Get-Content .\menu.json | ConvertFrom-Json

Write-Host "Welcome dear guest,"

$order = @()
$price = 0

while (-1) {
    switch ( Read-Host "Would you like to see the menu? (Y/N)" ) {
        Y {
            Write-Output $menu | Out-Host
            while (-1) {
                switch ( Read-Host "Would you like to order anything? (Y/N)" ) {
                    Y {
                        Write-Host "Splendid! Let me take your order."
                        do {
                            do {
                                $failed = $false
                                try {
                                    [int]$item = Read-Host "Please type the id of the dish (0-10) you wish to order"
                                }
                                catch {
                                    Write-Host "That is not a number. Please insert digits from 0-10." -fore red
                                    $failed = $true
                                    #continue
                                }
                            } while ($failed)

                            if (($item -as [int] -gt 10) -or ($item -as [int] -lt 0)) {
                                Write-Host "Sorry, this is not an item that we offer. Please order from items 0-10." -fore red
                                continue
                            $succeeded = "yes"
                            } 
                        }
                        until (($item -as [int] -le 10) -and ($item -as [int] -ge 0) -and ($succeeded = "yes"))

                        $dish = $menu[$item].Dish
                        $orderline = $menu[$item]
                        switch (
                            Read-Host "You ordered $dish. Correct? (Y/N)"
                        ) {
                            Y {
                                $order += $orderline
                                $price += $menu[$item].Price
                                Write-Host "Order confirmed" -fore green
                                break
                            } N {
                                Write-Host "Order cancelled" -fore red
                                break
                            }
                            default { Write-Host "I did not understand your answer. Please respond with 'Y' or 'N'" -fore red }
                        }

                        do {
                            $more = Read-Host "Would you like to order something else? (Y/N)"
                            if ($more -eq "Y") {
                                do {
                                    do {
                                        $failed = $false
                                        try {
                                            [int]$item = Read-Host "Please type the id of the dish (0-10) you wish to order"
                                        }
                                        catch {
                                            Write-Host "That is not a number. Please insert digits from 0-10." -fore red
                                            $failed = $true
                                            #continue
                                        }
                                    } while ($failed)
        
                                    if (($item -as [int] -gt 10) -or ($item -as [int] -lt 0)) {
                                        Write-Host "Sorry, this is not an item that we offer. Please order from items 0-10." -fore red
                                        continue
                                    $succeeded = "yes"
                                    } 
                                }
                                until (($item -as [int] -le 10) -and ($item -as [int] -ge 0) -and ($succeeded = "yes"))
                                $dish = $menu[$item].Dish
                                $orderline = $menu[$item]
                                switch (
                                    Read-Host "You ordered $dish. Correct? (Y/N)"
                                ) {
                                    Y {
                                        $order += $orderline
                                        $price += $menu[$item].Price
                                        Write-Host "Order confirmed" -fore green
                                        break
                                    } N {
                                        Write-Host "Order cancelled" -fore red
                                        continue
                                    }
                                    default { Write-Host "I did not understand your answer. Please respond with 'Y' or 'N'" -fore red }
                                }
                            } elseif (
                                ($more -ne "Y") -and ($more -ne "N")
                            ) {
                                Write-Host "I did not understand your answer. Please respond with 'Y' or 'N'" -fore red
                            }
                        }
                        until ($more -eq "N")
                        Write-Host "`nThank you for your order!`n`nHere is a summary of your order:"
                        Write-Output $order | Out-Host
                        Write-Host "The amount to pay is $price euro." -fore Yellow
                        exit

                    }
                    N {
                        Write-Host "OK, no problem. See you next time!"
                        exit
                    }
                    default { 
                        Write-Host "I did not understand your answer. Please respond with 'Y' or 'N'" -fore red 
                        continue
                    }
                }
            }
        }
        N {
            Write-Host "OK, no problem. See you next time!"
            exit
        }
        default { Write-Host "I did not understand your answer. Please respond with 'Y' or 'N'" -fore red }
    }
}