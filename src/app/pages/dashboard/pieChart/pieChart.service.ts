import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'dashboard.casa1',
        stats: '$ 57,820',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'dashboard.casa2',
        stats: '$ 89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'dashboard.casa3',
        stats: '$ 178,391',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'dashboard.casa4',
        stats: '$ 32,592',
        icon: 'money',
      }
    ];
  }
}
