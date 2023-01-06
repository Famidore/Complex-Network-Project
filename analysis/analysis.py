import os

# dirname = os.path.dirname(__file__)
h, t = os.path.split(__file__)
h, t = os.path.split(h)
data_src = os.path.join(h, 'pythonWebscrapper\data.txt')

with open(data_src, 'r+') as data:
    for line in data.readlines():
        print(line)