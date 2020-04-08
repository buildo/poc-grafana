# How to run


Launch grafana, prometheus and pushgateway with
```
cd docker
docker-compose up -d
```

Then open `http://localhost:3000` (grafana default login is `admin/admin`), click on Configuration -> API Keys on the left panel and add a new API Key.
Copy and paste its value in `grafanaApiKey` in `genDash.js`.

Push new metrics into prometheus via pushgateway with `pushMetrics.sh` in the `scripts` folder, and then execute
```
cd generate-dashboards
yarn
yarn start
```
to generate the dashboards and push them in grafana
