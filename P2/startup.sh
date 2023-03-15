cd restify
sudo apt install python3-pip
pip install virtualenv
virtualenv venv
venv/bin/activate
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver