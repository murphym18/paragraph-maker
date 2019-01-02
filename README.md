# Paragraph Maker

![ Paragraph Maker](http://i.imgur.com/WpuFwhb.png  "Paragraph Maker")

## How to get setup
You need to clone this repository, install all the dependencies, and put your bluemix.net login into `cred.py`

To get the python `bottle` library installed on Linux mint enter

```bash
	sudo apt-get install python3-bottle
```

You also need to get python's natural language tool kit (nltk) installed. To install this enter:

```bash
	sudo pip3 install -U nltk
```
	
I also installed nltk's data using [these instructions](http://www.nltk.org/data.html#interactive-installer)

It might be tricky to get the Watson SDK for python installed on Linux mint. I needed to install developer versions of various C libraries by entering:

```bash
	sudo apt install libffi-dev libssl-dev libxml2-dev libxslt1-dev libjpeg8-dev zlibg-dev python3-dev
```
	
After that you can install the Watson SDK for python by entering:

```bash
	sudo pip3 install -U watson-developer-cloud
```

With all the dependcies installed, you only need to edit `cred.py`

Login to https://console.bluemix.net/ and get your credentials for the text to speech service. Replace the appropriate strings in `cred.py`

## Running Paragraph Maker
To run the server:
```bash
	python3 main.py
```
Now you point your browser at http://localhost:8000/static/
