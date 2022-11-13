
from mimetypes import init
from bs4 import BeautifulSoup
import time
import requests

lookedAt = []
available = []


def getRecommendations(url):
    if url not in lookedAt:
        lookedAt.append(url)
        print(f'\nLooking at: {url}\n')

        tries = 0
        title = None
        while not title:
            tries += 1
            try:
                pageContent = requests.get(url, timeout=8).text
            except requests.exceptions.RequestException:
                print(
                    "There's an error connecting to the subreddit, trying again in 5 sec...")
                time.sleep(5)
                pass
            listed = []
            soup = BeautifulSoup(pageContent, 'html5lib')
            title = soup.find_all(class_="_3BFvyrImF3et_ZF21Xd8SC")
            members = soup.find_all(class_="e0X82913OdCTkFf2HU-WL")
            image = soup.find_all("img", class_="_2BR7Oy0CAj5EiSDYQ--CAE")
            if title:
                for i, j, k in zip(title, members, image):
                    print(f"\t{i.text:>24}\t\t{j.text:17}")
                    listed.append([i.text, j.text.split(" ")[0], k['src']])
                    time.sleep(0.5)
            if tries > 10:
                print("Could not find recommendations in " + url)
                break
        if listed:
            writeData(f"{url} = {listed}\n", url)
        time.sleep(2)
    else:
        # print(f"\nAlready looked at: {url}\n")
        # time.sleep(0.5)
        return []
    return listed


def doStuff(sub):
    if sub:
        for start in sub:
            available.append(start[0])
        while available:
            for i in available:
                available.remove(i)
                for j in getRecommendations(f'https://www.reddit.com/{i}'):
                    if j:
                        available.append(j[0])
    else:
        input("Program Finished")


def writeData(new_data, validURL, filename='data.txt'):
    verified = []
    with open(filename, 'r+') as file:
        for line in file.readlines():
            verified.append(line.split(" ")[0])
        if validURL not in verified:
            file.write(new_data)
            print("\n Saved the data \n")
        else:
            print("\n Key already exists \n")


starter = input('Submit a reddit community link: ')
if starter[-1] == "/":
    temp = list(starter)
    temp[-1] = ""
    starter = ''.join(temp)
doStuff(getRecommendations(starter))

input("Program finished, press any key to exit...")