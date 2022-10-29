from mimetypes import init
from bs4 import BeautifulSoup
import requests
import time

def getRecommendations(url):
    pageContent = requests.get(url).text
    listed = []
    # print(pageContent)
    soup = BeautifulSoup(pageContent, 'lxml')
    title = soup.find_all(class_="_3BFvyrImF3et_ZF21Xd8SC")
    print(f'\n Recommendations for {url}: \n')
    # print(title)
    for i in title:
        print(i.text)
        listed.append(i.text)
        time.sleep(2)
    return listed
    # print(pageContent.content)
    # print(title)



temp = getRecommendations(input())
# print(temp)
for i in temp:
    getRecommendations(f'https://www.reddit.com/{i}')