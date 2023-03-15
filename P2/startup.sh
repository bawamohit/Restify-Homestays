cd ./restify
python get-pip.py
pip install virtualenv
virtualenv venv
source ./venv/Scripts/activate
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install pillow
python manage.py makemigrations
python manage.py migrate
/bin/bash