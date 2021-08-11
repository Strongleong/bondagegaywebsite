import os
import requests as r

for link in links:
	name = link.split('/')
	if not os.path.isfile(name[5] + '/' + name[6]):
		sound = r.get(link)
		if sound.status_code == 200:
			with open(name[5] +'/' + name[6], 'wb') as file:
				file.write(sound.content)
				print(name[5] + '/' + name[6] + ' downloaded.')