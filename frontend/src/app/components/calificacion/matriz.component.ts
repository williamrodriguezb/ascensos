import { Component } from '@angular/core';
import { peticionesService } from '../../services/peticiones.service';

import { Matriz } from '../../models/matriz';

@Component({
  selector: 'hojaPersona',
  templateUrl: '../../views/calificacion/matriz/matriz.component.html',
  styleUrls: ['../../views/calificacion/matriz/matriz.component.css'],
  providers: [peticionesService]
})
export class MatrizComponent {
  public panelSeleccionado;
  public matriz;
  public indicadores;
  public data_radar;
  public labels_radar;
  public i;
  public indicador_seleccionado;
  public factor_seleccionado
  public factores
  public puntuaciones

  constructor(private _peticiones: peticionesService) {
    // this.panelSeleccionado = '';

    this.indicadores = [
      {
        nombre: 'Desempeño Profesional',
        factores: [
          {
            nombre: 'antiguedad',
            puntuacion: [
              { tipo: 'primer Tercio', puntos: 5 },
              { tipo: 'segundo Tercio', puntos: 3 },
              { tipo: 'tercer aspectos', puntos: 1 },
            ]
          },
          {
            nombre: 'evaluacion',
            puntuacion: [
              { tipo: 'lista 1', puntos: 5 },
              { tipo: 'lista 2', puntos: 3 },
              { tipo: 'lista 3', puntos: 1 },
              { tipo: 'lista 3', puntos: -5 },
            ]
          },
          {
            nombre: 'condecoraciones',
            puntuacion: [
              { tipo: 'militares extranjeras', puntos: 2 },
              { tipo: 'merito academico o entidades', puntos: 2 },
              { tipo: 'servicios distincidos', puntos: 3 },
              { tipo: 'otorgados por presidencia', puntos: 5 },
              { tipo: 'al valor', puntos: 3 },
              { tipo: 'orden publico', puntos: 3 },
            ]
          },
        ],
      },
      {
        nombre: 'Compromiso Institucional',
        factores: [
          { nombre: 'Unidades', puntuacion:[
            {tipo:'unidad a flote', puntos: 10},
            {tipo:'submarino', puntos: 10},
            {tipo:'estacion guardacostas', puntos: 10},
            {tipo:'unidad tactica im', puntos: 10},
            {tipo:'grupo aeronaval', puntos: 10},
            {tipo:'regional Inteligencia', puntos: 10},
            {tipo:'unidad logistica', puntos: 10},
          ] },
          { nombre: 'Tiempo Guarnicion' },
        ]
      },
      {
        nombre: 'Condiciones Personales', factores: [
          { nombre: 'Actitud Psicofisica' },
          { nombre: 'Cultura Fisica' },
          { nombre: 'Ausencias Laborales' },
          { nombre: 'Antecedentes' },
        ]
      },
      {
        nombre: 'Profesionalizacion', factores: [
          { nombre: 'Cursos Militares' },
          { nombre: 'Competencias Profesionales' },
          { nombre: 'Competencias Tecnologicas' },
          { nombre: 'Preparacion Personal Institucional' },


        ]
      },
      {
        nombre: 'Acredita Conducta', factores: [
          { nombre: 'felicitaciones' },
          { nombre: 'sanciones' },
          { nombre: 'conceptos' },
          { nombre: 'jinetas de buena conducta' },
        ]
      },

    ];
    this.matriz = new Matriz(1, 'Junta Clasificadora', this.indicadores);
    let etiquetas;
    let indicador = []

    for (let i in this.matriz['indicadores']) {
      indicador.push(this.matriz['indicadores'][i]['nombre'])
    }

    this.labels_radar = indicador;
    this.data_radar = [{ data: [5, 2, 10, 6, 8] },
      { data: [10, 10, 10, 10, 10], label: 'Series b' }];
    this.indicador_seleccionado = 0;
    this.factor_seleccionado = 0;
    this.puntuaciones = this.matriz["indicadores"][this.indicador_seleccionado]["factores"][this.factor_seleccionado].puntuacion;;

  }
  ngOnInit() {
    this.factores = this.matriz['indicadores'][this.indicador_seleccionado]['factores'];
    console.log(this.matriz['indicadores']);

  }
  panel(n) {
    this.panelSeleccionado = n;
  }
}
