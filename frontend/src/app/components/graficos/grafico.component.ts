import { Component,Input} from '@angular/core';

@Component({
  selector: 'graficos',
  templateUrl: '../../views/graficos/graficos.component.html',
  styleUrls: ['../../views/graficos/graficos.component.css'],

})
export class GraficosComponent{

 @Input() tipo:string ;
 @Input() datos:any[] ;
 @Input() etiquetas:string[] ;
  public barChartOptions:any = {
    responsive: true,
  };
  public barChartLabels:string[] = ['1','2','3','4','5'];
  public barChartLegend:boolean = false;
  public barChartData:any[] = this.datos;
  public lineChartColors:Array<any> = [
    { // verde
      backgroundColor: 'rgba(139, 195, 74, 0)',
      borderColor: 'rgba(148,159,177,0)',
      pointBackgroundColor: 'rgba(148,159,177,0)',
      pointBorderColor: 'rgba(148,159,177,0)',
      pointHoverBackgroundColor: 'rgba(148,159,177,0)',
      pointHoverBorderColor: 'rgba(148,159,177,0)'
    },
    { // rojo
      backgroundColor: 'rgba(201, 48, 44, 0.2)',
      borderColor: 'rgba(201, 48, 44, 0.3)',
      pointBackgroundColor: 'rgba(148,159,177,0)',
      pointBorderColor: 'rgba(148,159,177,0)',
      pointHoverBackgroundColor:'rgba(148,159,177,0)',
      pointHoverBorderColor: 'rgba(148,159,177,0)'
    },
    { // Amarillo
      backgroundColor: 'rgba(255, 230, 8, 0.4)',
      borderColor: 'rgba(255, 235, 59, 0.3)',
      pointBackgroundColor: 'rgba(148,159,177,0)',
      pointBorderColor: 'rgba(148,159,177,0)',
      pointHoverBackgroundColor: 'rgba(148,159,177,0)',
      pointHoverBorderColor: 'rgba(148,159,177,0)'
    },{ // verde
      backgroundColor: 'rgba(68, 157, 68,0.2)',
      borderColor: 'rgba(68, 157, 68,0.3)',
      pointBackgroundColor: 'rgba(148,159,177,0)',
      pointBorderColor: 'rgba(148,159,177,0)',
      pointHoverBackgroundColor: 'rgba(148,159,177,0)',
      pointHoverBorderColor: 'rgba(148,159,177,0)'
    }
  ];
  // events


  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log(e);
  }
  ngOnInit(){

    console.log(this.datos);
  }
}
