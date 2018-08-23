import requests
from bs4 import BeautifulSoup
import json

result = requests.get('http://cloford.com/resources/codes/index.htm')

content = result.content

bsoup = BeautifulSoup(content, 'html5lib')

tables = (bsoup.find_all('table'))

country_code_to_contient = {}

for rows in tables[3].find_all('tr'):
    children = rows.findChildren('td')
    if len(children) > 0:
        continent = children[0].text.lower()
        country_code = children[4].text.lower()
        country_code_to_contient[country_code] = continent
        if country_code == 'zi':
            break;
        print(continent, country_code)

with open('contients.json', 'w') as file:
    json.dump(country_code_to_contient, file)
