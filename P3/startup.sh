cd ./backend
python get-pip.py
pip install virtualenv
virtualenv venv
source ./venv/Scripts/activate
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install pillow
pip install django-cors-headers
python manage.py makemigrations
python manage.py migrate
cd ../frontend
npm install -g npm
npm i
/bin/bash