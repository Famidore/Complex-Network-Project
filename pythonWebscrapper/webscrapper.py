
from mimetypes import init
from bs4 import BeautifulSoup
import time, json, requests

def getRecommendations(url):
    print(f'\nLooking at: {url}\n')
    pageContent = requests.get(url).text
    listed = []
    soup = BeautifulSoup(pageContent, 'lxml')
    title = soup.find_all(class_="_3BFvyrImF3et_ZF21Xd8SC")
    for i in range(5):
        title = soup.find_all(class_="_3BFvyrImF3et_ZF21Xd8SC")
        if title:
            break
    if not title :
        print('\nExtended the limit \n Waiting...\n')
        for i in range(5):
            print(f'Waiting {i*5 + 5} sec...')
            # print(pageContent)
            time.sleep(1)
    else:
        print(f'\n Recommendations for {url}: \n')
        for i in title:
            print(i.text)
            listed.append(i.text)
            time.sleep(2)
    if listed:
        write_json({url : listed})
    else:
        write_json({"te" : "mp"})
    return listed


starter =  input('Submit a reddit community link: ')
def doStuff(tag):
    if tag:
        for item in tag:
            if item:
                starter = f'https://www.reddit.com/{item}'
                doStuff(getRecommendations(f'https://www.reddit.com/{item}'))


def write_json(new_data, filename='data.json'):
    with open(filename,'r+') as file:
        file_data = json.load(file)
        l = []
        for keys in file_data["details"]: 
            for k in keys:
                l.append(k)
        if str(list(new_data.keys())[0]) not in l:
            # print(l, list(new_data.keys())[0])
            file_data["details"].append(new_data)
            file.seek(0)
            json.dump(file_data, file, indent = 4)
            print("\n Saved the data \n")
        else:
            print("\n Key already exists \n")


while True:
    doStuff(getRecommendations(starter))
