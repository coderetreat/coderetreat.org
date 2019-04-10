#!/usr/bin/python3

import sys
import json
import subprocess


event_file = open(sys.argv[1], 'r')
event_info = json.load(event_file)


for key in ['moderators', 'sponsors']:
    if key not in event_info: continue

    users_list = []
    for user in event_info[key]:
        if user[0] != '@':
            users_list.append({"name": user})
            continue

        command_line = "/1.1/users/show.json?screen_name=" + user[1:]
        command_response = subprocess.run(["twurl", command_line], capture_output="True", timeout=20)
        user_data = json.loads(command_response.stdout)
        if 'errors' in user_data:
            users_list.append({"name": user, "url": 'https://twitter.com/' + user[1:]})
            continue

        users_list.append({"name": user_data['name'], "url": 'https://twitter.com/' + user[1:]})
        
    event_info[key] = users_list

print(json.dumps(event_info, indent=4, sort_keys=True))
