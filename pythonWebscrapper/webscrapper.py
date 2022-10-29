from mimetypes import init
from bs4 import BeautifulSoup
import requests
import time

def getRecommendations(url):
    print(f'\nLooking at: {url}\n')
    pageContent = requests.get(url).text
    listed = []
    soup = BeautifulSoup(pageContent, 'lxml')
    title = soup.find_all(class_="_3BFvyrImF3et_ZF21Xd8SC")
    if title == []:
        print('\nExtended the limit \n Waiting...\n')
        for i in range(5):
            print(f'Waiting {i*2 + 2} sec...')
            time.sleep(2)
    else:
        print(f'\n Recommendations for {url}: \n')
        for i in title:
            print(i.text)
            listed.append(i.text)
            time.sleep(2)
    return listed


starter =  input('Submit a reddit community link: ')
def doStuff(tag):
    if tag:
        for item in tag:
            if item:
                starter = f'https://www.reddit.com/{item}'
                doStuff(getRecommendations(f'https://www.reddit.com/{item}'))


while True:
    doStuff(getRecommendations(starter))
