import { ClickListComponent } from 'src/app/shared/charts/click-list/click-list.component';
import { ComboChartComponent } from 'src/app/shared/charts/combo-chart/combo-chart.component';
import { GaugeChartComponent } from 'src/app/shared/charts/gauge-chart/gauge-chart.component';
import { ILineChartData } from 'src/app/shared/charts/line-chart/line-chart-interfaces';
import { LineChartComponent } from 'src/app/shared/charts/line-chart/line-chart.component';
import { PlainTextChartComponent } from 'src/app/shared/charts/plain-text-chart/plain-text-chart.component';
import { NumberCardChartComponent } from 'src/app/shared/charts/number-card-chart/number-card-chart.component';
import { IClickListItem } from 'src/app/shared/charts/click-list/click-list-interfaces';
import { IClickListData } from 'src/app/shared/charts/click-list/click-list-interfaces';
import { DashStatus } from 'src/app/shared/charts/click-list/click-list-interfaces';
import { IChart } from 'src/app/shared/interfaces';


export let DOCKER_CHARTS: IChart[] = [
  {
  title: 'CPU Usges',
  component: GaugeChartComponent,
  data:{},

    xAxisLabel: '',
    yAxisLabel: '',
    colorScheme: 'vivid'
  },

 {
    title: 'Docker MetaData Count',
    component: NumberCardChartComponent,
    data: [],
    xAxisLabel: '',
    yAxisLabel: '',
    colorScheme: 'vivid'
  },
 {
  title: 'Volume Details',
  component: ClickListComponent,
  data:{},
  xAxisLabel: '',
  yAxisLabel: '',
  colorScheme: {}
  },
 {
  title: 'Container Details',
  component: ClickListComponent,
  data:{},
    xAxisLabel: '',
    yAxisLabel: '',
    colorScheme: {}
  },
 {
  title: 'Process Details',
  component: ClickListComponent,
  data:{},
  xAxisLabel: '',
  yAxisLabel: '',
  colorScheme: {}
  },
 {
  title: 'Networks Details',
  component: ClickListComponent,
  data:{},
  xAxisLabel: '',
  yAxisLabel: '',
  colorScheme: {}
  }
];
