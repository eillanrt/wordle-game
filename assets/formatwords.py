import re

file_name = input('File name: ')

if not file_name.endswith('.txt'):
    file_name += '.txt'

try:
    with open(file_name, 'r') as words:
        data = words.readlines()

    fixed = [re.sub('[\', ]', '', word.upper())
            for word in data
            if word.strip()]

    fixed = list(dict.fromkeys(fixed))

    fixed[-1] = fixed[-1].strip()

    with open(file_name, 'w') as words:
        words.writelines(fixed)

except:
    print("File Not Found")