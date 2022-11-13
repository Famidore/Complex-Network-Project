
from mimetypes import init
from bs4 import BeautifulSoup
import time
import requests

lookedAt = []


def getRecommendations(url):
    if url not in lookedAt:
        lookedAt.append(url)
        print(f'\nLooking at: {url}\n')

        tries = 0
        title = None
        while not title:
            tries += 1
            pageContent = requests.get(url, timeout=5).text
            listed = []
            soup = BeautifulSoup(pageContent, 'html5lib')
            title = soup.find_all(class_="_3BFvyrImF3et_ZF21Xd8SC")
            members = soup.find_all(class_="e0X82913OdCTkFf2HU-WL")
            if title:
                for i, j in zip(title, members):
                    print("\t" + i.text + "\t" + j.text)
                    listed.append([i.text, j.text.split(" ")[0]])
                    time.sleep(1)
            if tries > 15:
                print("Could not find recommendations in " + url)
                break
        if listed:
            writeData(f"{url} = {listed}\n")
        time.sleep(2)
    else:
        print(f"Already looked at: {url}")
        return None
    return listed


starter = input('Submit a reddit community link: ')


def doStuff(sub):
    for start in sub:
        available = getRecommendations(f'https://www.reddit.com/{start}')
    # input(available)
    while available:
        print(available[0], type(available[0]))
        for i in available:
            for j in getRecommendations(f'https://www.reddit.com/{i[0]}'):
                if j:
                    available.append(j)


def writeData(new_data, filename='data.txt'):
    with open(filename, 'r+') as file:
        if new_data not in file:
            # print(l, list(new_data.keys())[0])
            file.write(new_data)
            print("\n Saved the data \n")
        else:
            print("\n Key already exists \n")


doStuff(getRecommendations(starter))
