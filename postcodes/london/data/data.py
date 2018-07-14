import csv
import urllib.request
from bs4 import BeautifulSoup
pathToData = '../../../../Graph/london_postcodes.csv'

class Latlong():
    def __init__(self, lat=0, long=0):
        self.long = long
        self.lat = lat
    def setLatitude(self, lat):
        self.lat = lat
    def setLongitude(self, long):
        self.long = long

postcode_longlat = {}

with open(pathToData) as csvfile:
    csvReader = csv.DictReader(csvfile, delimiter=',')
    for row in csvReader:
        postcode_longlat[row['Postcode']] = Latlong(row['Latitude'], row['Longitude'])

hospital_url = 'https://www.allinlondon.co.uk/directory/1379.php'
hospital_dict = {}

def urlToString(url):
    fp = urllib.request.urlopen(url)
    mybytes = fp.read()
    html = mybytes.decode("utf8")
    fp.close()
    return html

def addToHospitals(url, dict):
    soup = BeautifulSoup(urlToString(hospital_url), 'html.parser')
    divs = soup.find_all('div', class_='well well-sm')

    for div in divs:
        for hospital in div.findChildren('span', class_='larger'):
            text = hospital.parent.next_sibling.next_sibling.split('  ')
            dict[hospital.string] = text[1]

for i in range(1, 6):
    if i != 1:
        hospital_url = 'https://www.allinlondon.co.uk/directory/1379-' + str(i) + '.php'
        addToHospitals(hospital_url, hospital_dict)
    else:
        hospital_url = 'https://www.allinlondon.co.uk/directory/1379.php'
        addToHospitals(hospital_url, hospital_dict)

print(hospital_dict)
