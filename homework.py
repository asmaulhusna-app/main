import time
import random
import os
if os.name == 'nt':
    os.system('cls')
def printslow(text):
    for character in text:
        if character == " ":
            time.sleep(random.uniform(0.02, 0.03))
        elif character in [".", ",", "'", "😢🌹"]:
            time.sleep(random.uniform(0.2, 0.5))
        else: 
            time.sleep(random.uniform(0.06, 0.12))
        print(character, end="", flush=True)
#VAzifa 1: Greet the user by their family name

familyname = input("Familiyangizni ni kiriting janob pomidor -- ")
printslow("Salam aleykum, janob " + familyname + " 🤗🌹")

time.sleep(0.3)
print("\n" * 3)
time.sleep(0.1)

#VAzifa 2: State the users school name

schoolname = input(f"Maktabizni nomini aytvoring janob {familyname} --  ")
printslow(f"Siz {familyname}, {schoolname} maktabida o‘qivotkaningizni bilib oldim🤗🌹")

time.sleep(0.3)
print("\n" * 3)
time.sleep(0.1)
if os.name == 'nt':
    os.system('cls')
#VAzifa 3: Calculate АНИК Ёши

birthdate = input("Qachon tug'ilding janob JIGULI🚗🚘🏎️ (DD.MM.YYYY): ")
birthdate = birthdate.split(".")
birthday = int(birthdate[0])
birthmonth = int(birthdate[1])
birthyear = int(birthdate[2])

currentyear = time.localtime().tm_year
currentday = time.localtime().tm_mday
currentmonth = time.localtime().tm_mon
year = currentyear - birthyear
month = currentmonth - birthmonth
if month < 0:
    year -= 1
    month += 12
day = currentday - birthday
if day < 0:
    month -= 1
    if month < 0:
        year -= 1
        month += 12
    if currentmonth in [1, 3, 5, 7, 8, 10, 12]:
        day += 31
    elif currentmonth in [4, 6, 9, 11]:
        day += 30
    else:
        day += 28

    
finalage = f"{year} yil, {month} oy, {day} kun"
printslow(f"Siz {finalage} yashagansiz, janob {familyname}🤗🌹")

time.sleep(0.3)
print("\n" * 3)
time.sleep(0.1)

#VAzifa 4: calcutlate CУММА of three numbers
num1 = int(input("Birinchi son ayting🤗: "))
num2 = int(input("Ikkinchi son ayting🤗: "))  
num3 = int(input("Uchinchi son ayting🤗: "))
sum = num1 + num2 + num3
printslow(f"shu uchta sonning yigindisi🌹: {sum}")

time.sleep(0.3)
print("\n" * 3)
time.sleep(0.1)

#VAzifa 5: Calculate the perimeter of a rectangle
length = int(input("tortburchakni uzunligini kiriting😉 --  "))
width = int(input("tortburchakni kengligini kiriting😂😂😂😂 --  "))
perimeter = 2 * (length + width)
stage1mock = f"ehhh, siz {schoolname}da o'qib turib, shu to'rtburchakning perimetri {perimeter} ekanligini bilmaysiz, janob {familyname}. 😢🌹"
printslow(stage1mock)