## To Install

First create virtual environment using [virtualenv](https://virtualenv.pypa.io/en/stable/installation/) in this directory

```bash
virtualenv env
source env/bin/activate # Linux, MacOS
env/Scripts/activate # Windows
```

Install the python requirements
```bash
(env) pip3 install -r requirements.txt
```

## Run the API

```
(env) uvicorn main:app --reload
```

> DO NOT type the `(env)` in the above commands

