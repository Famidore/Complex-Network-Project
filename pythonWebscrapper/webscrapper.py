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
    while True:
        if title == []:
            print('Extended the limit \n Waiting...\n')
            time.sleep(60)
        else:
            print(f'\n Recommendations for {url}: \n')
            # print(title)
            for i in title:
                print(i.text)
                listed.append(i.text)
                time.sleep(2)
        return listed
    # print(pageContent.content)
    # print(title)



temp = getRecommendations(input('Submit a reddit community link: '))
# print(temp)
for i in temp:
    getRecommendations(f'https://www.reddit.com/{i}')