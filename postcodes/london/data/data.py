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
            if text[1] in postcode_longlat:
                dict[hospital.string] = postcode_longlat[text[1]]
            else:
                print(text[1])

for i in range(1, 6):
    if i != 1:
        hospital_url = 'https://www.allinlondon.co.uk/directory/1379-' + str(i) + '.php'
        addToHospitals(hospital_url, hospital_dict)
    else:
        hospital_url = 'https://www.allinlondon.co.uk/directory/1379.php'
        addToHospitals(hospital_url, hospital_dict)

print(hospital_dict)

with open('hospitals.csv', 'w') as csvFile:
    csvWriter = csv.writer(csvFile)
    csvWriter.writerow(['Hospital_Name', 'Latitude', 'Longitude'])
    for Hospital_Name in hospital_dict:
        lat = hospital_dict[Hospital_Name].lat
        long = hospital_dict[Hospital_Name].long
        csvWriter.writerow([Hospital_Name, lat, long])

#with open('postcode.csv', 'w') as csvFile:
#    csvWriter = csv.writer(csvFile)
#    csvWriter.writerow(['Postcode', 'Latitude', 'Longitude'])
#    for postcode in postcode_longlat:
#        lat = postcode_longlat[postcode].lat
#        long = postcode_longlat[postcode].long
#        csvWriter.writerow([postcode, lat, long])
