import { ILineChartData } from 'src/app/shared/charts/line-chart/line-chart-interfaces';
import { LineChartComponent } from 'src/app/shared/charts/line-chart/line-chart.component';
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
  }
];
