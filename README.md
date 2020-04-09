# How to run


Launch grafana, prometheus and pushgateway with
```
cd docker
docker-compose up -d
```

Then 
- open `http://localhost:3000` (grafana default login is `admin/admin`)
- add Prometheus as a datasource (it is accessible on port `9090`)
- click on Configuration -> API Keys on the left panel and add a new API Key.
- copy and paste the value of the API Key in `grafanaApiKey` in `genDash.js`.

Push new metrics into prometheus via pushgateway with `pushMetrics.sh` in the `scripts` folder, and then execute
```
cd generate-dashboards
yarn
yarn start
```
to generate the dashboards and push them in grafana.
