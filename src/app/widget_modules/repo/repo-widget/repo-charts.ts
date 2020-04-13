import { ILineChartData } from 'src/app/shared/charts/line-chart/line-chart-interfaces';
import { LineChartComponent } from 'src/app/shared/charts/line-chart/line-chart.component';
import { NumberCardChartComponent } from 'src/app/shared/charts/number-card-chart/number-card-chart.component';
import { IChart } from 'src/app/shared/interfaces';
import {RepoDetailComponent} from '../repo-detail/repo-detail.component';

export let REPO_CHARTS: IChart[] = [
  {
    title: 'Issues, Pulls and Commits Per Day',
    component: LineChartComponent,
    data: {
      areaChart: true,
      detailComponent: RepoDetailComponent,
      dataPoints: [
        {
          name: 'Commits',
          series: []
        },
        {
          name: 'Pulls',
          series: []
        },
        {
          name: 'Issues',
          series: []
        },
      ]} as ILineChartData,
    xAxisLabel: 'Date',
    yAxisLabel: 'Commits, Pull Requests, and Issues',
    colorScheme: {
      domain: ['blue', 'green', 'red', 'grey', 'grey', 'grey']
    }
  },
  {
    title: 'Commits, Pull Requests, and Issues Summary',
    component: NumberCardChartComponent,
    data: [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  }
],
    xAxisLabel: '',
    yAxisLabel: '',
    colorScheme: {
      domain: ['blue', 'blue', 'blue', 'green', 'green', 'green', 'red', 'red', 'red']
    }
  }
];
