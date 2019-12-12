# Expenses

An application for tracking of user’s expenses

User is able to create an account and log in.

When logged in, user can see a list of his expenses: what money is spent for and how much, also he is able to edit and delete them.

Each entry has a date, time, text, and cost.

Filter by text, dates from-to, time from-to.

User setting – Expected number of money spent per day.
When displayed, it goes green if the total for current day is less than expected number per day, 
otherwise goes red.

Groups:

regular_user (can CRUD their own records)
user_manager (can CRUD users, except their groups)
admin (can CRUD all records and users)

And tests should be added (review DRF testing section)


Test users:

```
admin / admin
test123 / aYMX5Wk7Cu
Yuliya / rM7759hw96
user4 / EkbZxEXyAm
```


```
python manage.py test --settings=drf_expenses.settings-test
```


## Usage
To run app with web UI locally make the next steps:
```
cd drf_expenses/
source venv/bin/activate
python manage.py runserver

cd frontend
yarn run
```
Go to `localhost:3000`.

## Test users
```
admin / admin
test123 / aYMX5Wk7Cu
Yuliya / rM7759hw96
user4 / EkbZxEXyAm
qwerty / rM7759hw96
```

## Django admin
Go to `http://127.0.0.1:8000/admin/`.

Username: `admin`
Password: `admin`




## Run tests:
```
python manage.py test --settings=drf_expenses.settings-test

python manage.py test -v 2 users.tests.tests.UserRegistrationAPIViewTestCase.test_invalid_password 
```
