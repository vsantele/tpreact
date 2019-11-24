# -*- coding: utf-8 -*-
import csv
import json

csvfile = open('vocAnglais.csv', 'r', encoding='utf-8')
jsonfile = open('vocAnglais.json', 'w', encoding='utf-8')

fieldnames = ("fr", "an")
reader = csv.DictReader( csvfile, fieldnames, delimiter=';')
index = 0
jsonfile.write('[')
for row in reader:
    row["id"] = index
    row['correct'] = {}
    row["correct"]["fr"] = "neutre"
    row["correct"]["an"] = "neutre"
    row["afficher"] = bool(1)
    json.dump(row, jsonfile)
    jsonfile.write(',\n')
    index += 1
jsonfile.write(']')
jsonfile.close()
