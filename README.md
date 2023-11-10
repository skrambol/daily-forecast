## Installing on local (with Docker)
1. Build the docker image
```
docker build -t daily-forecast .
```

2. Run a container using the image built previously. Take note to replace `<your_api_key>` with your own AccuWeather API key.
```
docker run --name daily-forecast-dev -p 5173:5173 -e VITE_ACCUWEATHER_API_KEY=<your_api_key> daily-forecast
```

3. Visit `localhost:5173` in your web browser.


## Installing on local (without Docker)

1. Install npm dependencies.
```
npm install
```

2. Run the dev environment. Take note to replace `<your_api_key>` with your own AccuWeather API key.
```
VITE_ACCUWEATHER_API_KEY=<your_api_key> npm run dev
```

3. Visit `localhost:5173` in your web browser.
