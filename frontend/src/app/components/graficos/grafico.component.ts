import { Component, Input} from '@angular/core';

@Component({
  selector: 'graficos',
  templateUrl: '../../views/graficos/graficos.component.html',
  styleUrls: ['../../views/graficos/graficos.component.css'],

})
export class GraficosComponent {

  @Input() tipo: string;
  @Input() datos: any[];
  @Input() etiquetas: string[];
  @Input() color: Array<any>;
  public barChartOptions: any = {
    responsive: true,
    pointLabels: {
      fontSize: 10000
    },
    ticks: {
      beginAtZero: true
    },
  };
  public barChartLegend: boolean = true;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {
  }
}
