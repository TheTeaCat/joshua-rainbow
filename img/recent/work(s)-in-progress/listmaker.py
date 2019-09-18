import os
import random

randomChars = [chr(i) for i in range(ord("a"),ord("z")+1)] + [chr(i) for i in range(ord("A"),ord("Z")+1)] + [chr(i) for i in range(ord("0"),ord("9")+1)]

getRandomName = lambda n: "".join([randomChars[random.randint(0,len(randomChars)-1)] for i in range(n)])

imgNames = []

def k(n):
    try:
        return int(n.split(".")[0])
    except:
        return 999

print("\n".join(sorted(os.listdir(),key=k)))

for file in sorted(os.listdir(),key=k):
    if file.split(".")[1] == "jpg":
        randomName = getRandomName(20)+".jpg"
        imgNames.append(randomName)
        os.rename(file, randomName)

f = open("img-list.txt", "w")

f.write("\n".join(imgNames))

f.close()

