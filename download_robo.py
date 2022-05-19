import urllib.request

i = 0
while i < 1000: 
    addr = "0xf372384C2dFDeAc7482bA224Ec0b65964d41c98F0"
    url = "https://robohash.org/" + addr + str(i) + ".png"
    urllib.request.urlretrieve(url, "%s" % i)
    print("Downloading Robohash Number: %s" % i)
    i += 1
