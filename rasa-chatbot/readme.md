# How to start Rasa chat bot

### Restore python virtual environment

```bash
python -m venv env                        # create virtual environment
venv\Scripts\activate                     # activate environment
pip install -r requirements.txt           # install package
```


###  Rasa command

```bash
rasa train            # Trains a Rasa model using your NLU data and stories.
rasa interactive      # Starts an interactive learning session to create new  training data for a Rasa model by chatting.
rasa run              # Starts a Rasa server with your trained model.
rasa shell            # Loads your trained model and lets you talk to your assistant on the command line
```

### Note
On Debian you need the build-essential package:
```bash
sudo apt install build-essential
```