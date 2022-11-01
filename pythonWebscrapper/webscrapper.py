
from mimetypes import init
from bs4 import BeautifulSoup
import time
import json
import requests


def getRecommendations(url):
    print(f'\nLooking at: {url}\n')
    
    tries = 0
    title = None
    while not title:
        tries+=1
        pageContent = requests.get(url, timeout=2.5).text
        listed = []
        # print(title)
        # time.sleep(1)
        soup = BeautifulSoup(pageContent, 'html5lib')
        title = soup.find_all(class_="_3BFvyrImF3et_ZF21Xd8SC")
        for i in title:
            print("\t" + i.text)
            listed.append(i.text)
            time.sleep(2)
        if tries > 15:
            print("Could not find recommendations in " + url)
            break
    if listed:
        write_json({url: listed})
    time.sleep(2)
    return listed


starter = input('Submit a reddit community link: ')


def doStuff(tag):
    if tag:
        for item in tag:
            if item:
                starter = f'https://www.reddit.com/{item}'
                doStuff(getRecommendations(f'https://www.reddit.com/{item}'))


def write_json(new_data, filename='data.json'):
    with open(filename, 'r+') as file:
        file_data = json.load(file)
        l = []
        for keys in file_data["details"]:
            for k in keys:
                l.append(str(k))
        if str(list(new_data.keys())[0]) not in l:
            # print(l, list(new_data.keys())[0])
            file_data["details"].append(new_data)
            file.seek(0)
            json.dump(file_data, file, indent=4)
            print("\n Saved the data \n")
        else:
            print("\n Key already exists \n")


while True:
    doStuff(getRecommendations(starter))
