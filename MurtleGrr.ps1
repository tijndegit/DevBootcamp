param(
    [Parameter(Mandatory=$false)][string]$name = "Operator"
)

# Retrieve European capital cities.
$cities = curl -Uri https://raw.githubusercontent.com/alv2017/DataSets/master/Europe/europe-capital-cities.csv -UseBasicParsing
$data = $cities | ConvertFrom-Csv
$capitals = $data.capital

# Extract random city
$capitals = $capitals | Sort-Object {Get-Random}
$city = $capitals[0]

# Retrieve current date from chosen city.
$link = "http://worldtimeapi.org/api/timezone/Europe/$city"
$response = curl -Uri $link -UseBasicParsing
$timedata = $response.Content | ConvertFrom-Json
$datetime = $timedata.datetime
$date = $datetime | Get-Date -Format "MM/dd/yyy HH:mm"

# Write message
## Write opening sentences.
Write-Host "`n$city, $date`n`nHello $name,`n"
## Load required text files.
$template = Get-Content template.txt
$words = Get-Content words.txt | Sort-Object { Get-Random }
## Replace placeholders in template with randomly ordered words and add a year number.
$template = ($template -f $words) -Replace 'XX', (Get-Random -Minimum 10 -Maximum 99) | Out-File mission.txt

Get-Content mission.txt