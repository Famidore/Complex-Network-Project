import os
import matplotlib.pyplot as plt
import numpy as np

h, t = os.path.split(__file__)
h, t = os.path.split(h)
data_src = os.path.join(h, 'pythonWebscrapper\exampleData3.txt')

names = []
members = []
temp = []
eTimes = []

with open(data_src, 'r+') as data:
    for line in data.readlines():
        epoch = []
        mempoch = []
        for i in line.split("["):
            if i not in [',', '', '\n'] and i:
                epoch.append(i.split(', ')[0].split(' ')[-1].replace("'", ''))
                if len(i.split(" '")) > 1:
                    mempoch.append(int(((i.split(" '")[1])[0:-2]).replace(',', '')))
        names.append(epoch[1:])
        members.append(mempoch)


for i in range(len(names)):
    temPoch = []
    for j, k in zip(names[i], members[i]):
        temPoch.append([j, k])
    eTimes.append(len(temPoch))
    temp.append(temPoch)

# for i in temp:
#     for j in i:
#         print(j)
t = list(range(0, len([item for sublist in members for item in sublist])))
tt = 0
for i in range(1, len(eTimes)):
    tt += eTimes[i]
    plt.axvline(x = tt, color = (0, 0, 0, 0.5))
    
plt.scatter(t, [np.power(item, 1/2) for sublist in members for item in sublist], s=5)
plt.show()