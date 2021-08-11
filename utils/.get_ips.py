with open('/var/www/bondagegaywebsite.local/log/nginx/access.log', 'r') as f:
    log_line = f.readlines()

ip_list = [ line.split('- -')[0].strip() for line in log_line]

print(ip_list)
with open('/var/www/bondagegaywebsite.local/html/utils/.ip_list.txt', 'w') as f:
    f.write('\n'.join(ip_list))
