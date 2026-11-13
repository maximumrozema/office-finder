import csv
import json

records = []

with open("data/offices.csv", encoding="utf-8-sig") as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        records.append({
            "office": row["Office"],
            "occupant": row["Occupant"],
            "department": row["Department"],
            "svgId": row["SvgId"]
        })

with open("data/offices.json", "w", encoding="utf-8") as outfile:
    json.dump(records, outfile, indent=2)

print(f"Generated {len(records)} records")
