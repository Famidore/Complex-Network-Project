import os
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats as sp

h, t = os.path.split(__file__)
h, t = os.path.split(h)
data_src = os.path.join(h, 'pythonWebscrapper\exampleData3.txt')

names = []
members = []
temp = []
eTimes = []
parents = []
child_length = []

with open(data_src, 'r+') as data:
    for line in data.readlines():
        epoch = []
        mempoch = []
        for i in line.split("["):
            if i not in [',', '', '\n'] and i:
                epoch.append(i.split(', ')[0].split(' ')[-1].replace("'", ''))
                if len(i.split(" '")) > 1:
                    mempoch.append(
                        int(((i.split(" '")[1])[0:-2]).replace(',', '')))
        names.append(epoch[1:])
        members.append(mempoch)
        parents.append([line.split('r/')[1].split(' ')[0],
                       np.sum(members[-1]), len(names[-1])])


for i in range(len(names)):
    temPoch = []
    for j, k in zip(names[i], members[i]):
        temPoch.append([j, k])
    eTimes.append(len(temPoch))
    temp.append(temPoch)


# t = list(range(0, len([item for sublist in members for item in sublist])))
# tt = 0
# for i in range(1, len(eTimes)):
#     tt += eTimes[i]
#     plt.axvline(x = tt, color = (0, 0, 0, 0.5))

# plt.scatter(t, [np.power(item, 1/2) for sublist in members for item in sublist], s=5)
# plt.show()

# get parent

# print(names)

members_in_epoch = []
child_in_epoch = []
parent_members_epoch = []
for parent in parents:
    if 'r/' + parent[0] in [item for sublist in names for item in sublist]:
        n = [item for sublist in names for item in sublist].index(
            'r/' + parent[0])
        parent_members_epoch.append(
            [item for sublist in members for item in sublist][n])
        parent.append([item for sublist in members for item in sublist][n])
    else:
        parent_members_epoch.append(0)
        parent.append(0)
        # print('r/' + parent[0])

    print(parent)
    members_in_epoch.append(int(parent[1]))
    child_in_epoch.append(float(parent[2]))

# print(names)

corr = sp.pearsonr(members_in_epoch, child_in_epoch)
corr2 = sp.pearsonr(parent_members_epoch, child_in_epoch)
corr3 = sp.pearsonr(members_in_epoch, parent_members_epoch)

print(f'\n{corr}')
print(f'\n{corr2}')
print(f'\n{corr3}')

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()
ax3 = ax1.twinx()
# ax1.set_yscale('log')
# ax2.set_yscale('log')
t = np.arange(len(members_in_epoch))
ax1.bar(t, members_in_epoch, color='blue',
        label="Sum of Children's members", alpha=0.5)
ax2.bar(t, child_in_epoch, color='green',
        label='Number of Children', alpha=0.5)
ax3.bar(t, parent_members_epoch, color='red',
        label='Parent members', alpha=0.5)
fig.legend()
plt.show()
