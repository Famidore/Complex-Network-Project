import os
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats as sp
import statistics

h, t = os.path.split(__file__)
h, t = os.path.split(h)
data_src = os.path.join(h, 'pythonWebscrapper\exampleData.txt')

names = []
members = []
temp = []
eTimes = []
parents = []
child_length = []

recc_both = 0

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
        

for i in range(len(names) - 1):
    if 'r/' + parents[i][0] in names[i + 1]:
        recc_both += 1


    

for i in range(len(names)):
    temPoch = []
    for j, k in zip(names[i], members[i]):
        temPoch.append([j, k])
    eTimes.append(len(temPoch))
    temp.append(temPoch)

whole_pop = [item for sublist in members for item in sublist]


t = list(range(0, len(whole_pop)))
tt = 0
for i in range(1, len(eTimes)):
    tt += eTimes[i]
    # plt.axvline(x=tt, color=(0, 0, 0, 0.5))

f = plt.figure()
f.set_figwidth(10)
plt.ylabel('Number of members')
plt.xlabel('Index of subreddit')
plt.yscale('log')
plt.bar(t, whole_pop, width=1)
plt.show()


members_in_epoch = []
child_in_epoch = []
parent_members_epoch = []
parent_lower = 0
for parent in parents:
    if 'r/' + parent[0] in [item for sublist in names for item in sublist]:
        n = [item for sublist in names for item in sublist].index(
            'r/' + parent[0])
        parent_members_epoch.append(
            whole_pop[n])
        parent.append(whole_pop[n])
    else:
        parent_members_epoch.append(0)
        parent.append(0)
        # print('r/' + parent[0])

    # print(parent)
    members_in_epoch.append(int(parent[1]))
    child_in_epoch.append(float(parent[2]))


corr = sp.pearsonr(members_in_epoch, child_in_epoch)
corr2 = sp.pearsonr(parent_members_epoch, child_in_epoch)
corr3 = sp.pearsonr(members_in_epoch, parent_members_epoch)

for i, j in zip(members_in_epoch, parent_members_epoch):
    if i > j:
        parent_lower += 1

print(f'\nmembers to child: {corr}')
print(f'\nparent members to child: {corr2}')
print(f'\nmembers to parent members: {corr3}\n')
print('\nFor the whole population:')
print(f'\nPercent of less populated parents: {parent_lower/len(members_in_epoch) * 100}')
print(f'\nPercent of self reccomendations: {recc_both/len(members_in_epoch) * 100}')
print(f'\nMean: {statistics.mean(whole_pop)} Standard deviation: {statistics.pstdev(whole_pop)} variance: {statistics.pvariance(whole_pop)}\n')

print('\nFor the number of children:')
print(f'\nMean: {statistics.mean([item for item in child_in_epoch])} Standard deviation: {statistics.mean([item for item in child_in_epoch])}\n')

print('\nFor the parental population:')
print(f'\nMean: {statistics.mean([item for item in parent_members_epoch])} Standard deviation: {statistics.pstdev([item for item in parent_members_epoch])}\n')

fig, ax1 = plt.subplots()
fig.set_figwidth(10)
# ax2 = ax1.twinx()
ax3 = ax1.twinx()
ax1.set_yscale('log')
# ax2.set_yscale('log')
ax3.set_yscale('log')
t = np.arange(len(members_in_epoch))
ax1.bar(t, members_in_epoch, color='blue',
        label="Sum of Children's members", alpha=0.5, align='center', width=1)
# ax2.bar(t, child_in_epoch, color='green',
#         label='Number of Children', alpha=0.5, align='center', width=1)
ax3.bar(t, parent_members_epoch, color='red',
        label='Parent members', alpha=0.5, align='center', width=1)

fig.legend()
plt.show()
