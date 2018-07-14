import urllib.request
import csv
from bs4 import BeautifulSoup
from data import urlToString

def calculateShortestDistance(lat, long):
    with open('hospitals.csv') as csvFile:
        csvReader = csv.DictReader(csvFile, delimiter=',')
        for row in csvReader:
            url = 'https://www.google.co.uk/maps/dir/' + lat + ',' + long +'/' + row['Latitude'] + ',' + row['Longitude'];
            print(url)
            html = urlToString(url)
            soup = BeautifulSoup(html, 'html.parser')
            print(soup.find('div', {'id': "section-directions-trip-0"}))

calculateShortestDistance('51.520839', '-0.151346')
