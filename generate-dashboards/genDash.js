const grafana = require("grafana-dash-gen");
const axios = require("axios");
const Row = grafana.Row;
const Dashboard = grafana.Dashboard;
const Target = grafana.Target;
const SingleStat = grafana.Panels.SingleStat;

const grafanaApiKey = "";

SingleStat.prototype.addTarget = function addTarget(target) {
  this.state.targets.push({
    expr: target.toString(),
    hide: target.hide,
  });
};

grafana.configure({
  url: "http://0.0.0.0:3000/api/dashboards/db",
  cookie: `auth-openid=${grafanaApiKey}`,
  headers: {
    Authorization: `Bearer ${grafanaApiKey}`,
  },
});

const createTenantDashboard = (tenant) => {
  const dashboard = new Dashboard({
    title: `Tenant ${tenant} Dashboard`,
  });

  const row = new Row();

  const cpuPanel = new SingleStat({
    title: "CPU Usage",
    span: 5,
    targets: [new Target(`poc_cpu_usage{tenant="${tenant}"}`)],
    datasource: null,
    timeFrom: "30m",
  });
  const memoryPanel = new SingleStat({
    title: "Memory Usage",
    span: 5,
    targets: [new Target(`poc_memory_usage{tenant="${tenant}"}`)],
    datasource: null,
    timeFrom: "30m",
  });
  row.addPanel(cpuPanel);
  row.addPanel(memoryPanel);
  dashboard.addRow(row);

  grafana.publish(dashboard);
};

const createGlobalDashboard = (tenants) => {
  const dashboard = new Dashboard({
    title: `Global Dashboard`,
  });

  tenants.forEach((tenant) => {
    const row = new Row({
      title: `Tenant ${tenant}`,
    });
    const cpuPanel = new SingleStat({
      title: "CPU Usage",
      span: 5,
      targets: [new Target(`poc_cpu_usage{tenant="${tenant}"}`)],
      datasource: null,
      timeFrom: "30m",
    });
    const memoryPanel = new SingleStat({
      title: "Memory Usage",
      span: 5,
      targets: [new Target(`poc_memory_usage{tenant="${tenant}"}`)],
      datasource: null,
      timeFrom: "30m",
    });
    row.addPanel(cpuPanel);
    row.addPanel(memoryPanel);
    dashboard.addRow(row);
  });

  const row = new Row();

  grafana.publish(dashboard);
};

axios
  .get("http://0.0.0.0:9090/api/v1/label/tenant/values")
  .then(function (response) {
    response.data.data.forEach((tenant) => createTenantDashboard(tenant));
    createGlobalDashboard(response.data.data);
  });
