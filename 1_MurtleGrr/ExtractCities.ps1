# https://datahub.io/core/world-cities/r/world-cities.json
# https://github.com/idris-maps/map-of-europe/blob/master/data/cities.json
# https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.json
$cities = curl -Uri https://raw.githubusercontent.com/alv2017/DataSets/master/Europe/europe-capital-cities.csv -UseBasicParsing
$data = $cities | ConvertFrom-Csv
$capitals = $data.capital

$capitals = $capitals | Sort-Object {Get-Random}


#https://github.com/alv2017/DataSets/blob/master/Europe/europe-capital-cities.csv