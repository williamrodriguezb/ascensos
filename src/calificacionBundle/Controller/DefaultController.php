<?php

namespace calificacionBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\ParameterBag;


class DefaultController extends Controller
{
  public function indexAction(){
    $usuario = 'william';
    $correo = 'william.rodriguez.b';
    $perfil = 'administrador';
      return $this->render('calificacionBundle:default:calificacion.html.twig' , array (
        'usuario' => $usuario,
        'correo'  => $correo,
        'perfil'   => $perfil,
          ));
    }
  public function listadoAction(Request $request){

      $anio         =   $request->get('anio');
      $categoria    =   $request->get('categoria');
      $turno        =   $request->get('turno');

      $em = $this ->getDoctrine()->getManager();
      $calif_repo = $em->getRepository("calificacionBundle:calificacion");
      $listado= $calif_repo->getListado($anio,$categoria,$turno);

      $page = $request->query->getInt('page',1);

      $paginador = $this->get('knp_paginator');
      $items = 20;

      $paginacion = $paginador->paginate($listado,$page,$items);
      $total_items = $paginacion->getTotalItemCount();
      
      $datos = array(
              'pagina' =>$page,
              'total_items'  =>$total_items,
              'items_page'=>$items,
              'total_page' => ceil( $total_items/$items),
              'data'  => $paginacion
        );

      return $this->json($datos);
      
}
  public function buscaPersonaAction(Request $request, $identificacion=null){
   
    //DATOS RECUPERADOS
    $documento      = $request->get('documento');
    $apellidos      = $request->get('apellidos');
    $nombres        = $request->get('nombres');
    $categoria      = $request->get('categoria');

       if ($documento != null  or $apellidos != null or $nombres != null
        or  $categoria != null) {
      $em           =   $this ->getDoctrine()->getManager();
      $db           =   $em->getConnection();
      $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
      $listado      =   $calif_repo->buscaPersona($documento,$apellidos,$nombres,$categoria);


       // return new JsonResponse($listado)
       $page = $request->query->getInt('page',1);

      $paginador = $this->get('knp_paginator');
      $items = 10;

      $paginacion = $paginador->paginate($listado,$page,$items);
      $total_items = $paginacion->getTotalItemCount();
      // return new JsonResponse($paginacion['data']);
      return $this->json($paginacion); ;
    }
  }
  public function personaAction($id=''){
      $em           =   $this ->getDoctrine()->getEntityManager();
      $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
      $disan_siath  =   $em->getRepository("disanBundle:disan");
      $jpm_repo     =   $em->getRepository("jpmBundle:jpm");
      $persona      =   $calif_repo->getPersona($id);
        return new JsonResponse($persona);
  }
  public function pAccionAction($id,$accion){

    //conexion base de datos
    $em           =   $this ->getDoctrine()->getEntityManager();
    $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
    $jpm_repo   =   $em->getRepository("jpmBundle:jpm");

    // 

    if ($accion == 'tiempos') {
      $tiempos        =   $calif_repo->getTiempos($id);
      return new JsonResponse($tiempos);
    }

    //-------------------folios de vida
    if($accion == 'folios'){
      $folios   =   $calif_repo->getFolios($id);
      return new JsonResponse($folios);
    }

    if($accion == 'estimulos-represiones'){
      $felicitaciones = $calif_repo->getFelicitaciones($id);
      $merito = $calif_repo->getMerito($id);
      $concep_positivo = $calif_repo->getConceptoPositivo($id);
      $concep_negativo = $calif_repo->getConceptoNegativo($id);
      $demerito = $calif_repo->getDemerito($id);
      $condecoraciones = $calif_repo->getEstimulo($id,'CONDECORACION');
      $medallas = $calif_repo->getEstimulo($id,'MEDALLA');
      $distintivo = $calif_repo->getEstimulo($id,'DISTINTIVO');
      $sanciones = $jpm_repo->getSanciones($id);


       $n_medallas=0;
       $n_distintivos=0;
       $n_condecoraciones=0;
      foreach ($medallas as $key => $value) {
        if ($value['TIPO_ESTIMULO']=='MEDALLA') {
          $n_medallas= $n_medallas + 1;
        }
        if ($value['TIPO_ESTIMULO']=='DISTINTIVO') {
          $n_distintivos= $n_distintivos + 1;
        }if ($value['TIPO_ESTIMULO']=='CONDECORACION') {
          $n_condecoraciones= $n_condecoraciones + 1;
        }
      }
      
      $est_repre= array('felicitaciones'=>$felicitaciones,
                        'anotaciones_merito'=>$merito,
                        'anotaciones_demerito'=>$demerito,
                        'concepto_positivo'=>$concep_positivo,
                        'concepto_negativo'=>$concep_negativo,
                        'sanciones'=>$sanciones,
                        'estimulos'=>array(
                                          'n_condecoraciones'=>$n_condecoraciones,
                                          'n_medallas'=>$n_medallas,
                                          'n_distintivos'=>$n_distintivos
                                          ),
                        'condecoraciones'=>$condecoraciones,
                        'medallas'=>$medallas,
                        'n_distintivos'=>$n_distintivos
                        );

      return new JsonResponse($est_repre);
    }

    if($accion == 'perfil'){
      $idiomas = $calif_repo->getIdiomas($id);
      $formacion = $calif_repo->getFormacionAcademica($id);

      $result = array('idiomas'=>$idiomas,
                      'formacion'=>$formacion
          );
       return new JsonResponse($result);

    }
    
  }

  public function conteosAction($identificacion){
    $em               = $this->getDoctrine()->getManager();
    $calif_repo       = $em->getRepository('calificacionBundle:calificacion');
    $felicitaciones   = $calif_repo->countFelicitaciones($identificacion);
    $medallas   = $calif_repo->countMedallas($identificacion);
    $ausencias   = $calif_repo->countAusencias($identificacion);
    return $this->render('calificacionBundle:default:conteos.html.twig',array(
        'felicitaciones'=>$felicitaciones,
        'medallas'=>$medallas,
        'ausencias'=>$ausencias

      ));
  }
  public function folioAction($identificacion){
    $em               = $this->getDoctrine()->getManager();
    $calif_repo       = $em->getRepository('calificacionBundle:calificacion');
    $folio            = $calif_repo->getFolio($identificacion);
    return $this->render('calificacionBundle:default:folio.html.twig' ,array(
        'folio'=>$folio
      ) );
  }
  public function estadisticasAction(){

    return $this->render('calificacionBundle:default:estadisticas.html.twig');
  }
  public function historial_ascensosAction($id){

    $em = $this->getDoctrine()->getManager();
    $calif_repo = $em->getRepository('calificacionBundle:calificacion');
    $historial_ascensos = $calif_repo->getHistorialAscensos($id);
    return $this->render('calificacionBundle:default:historial_ascensos.html.twig',array(
      'historial_ascensos' => $historial_ascensos,
    ));

  }
  public function estim_repreAction($id){
    $em = $this->getDoctrine()->getManager();
    $calif_repo = $em->getRepository('calificacionBundle:calificacion');
    $jpm_repo = $em->getRepository('jpmBundle:jpm');
    $felicitaciones = $calif_repo->getFelicitaciones($id);
    $condecoraciones = $calif_repo->getcondecoraciones($id);
    $merito = $calif_repo->getMerito($id);
    $positivo = $calif_repo->getConceptoPositivo($id);
    $negativo = $calif_repo->getConceptoNegativo($id);
    $demerito = $calif_repo->getDemerito($id);
    $sanciones = $jpm_repo->getSanciones($id);
    $count_listas = $calif_repo->countListas($id);

    return $this->render('calificacionBundle:default:estim_repre.html.twig',array(
        'felicitaciones'=>$felicitaciones,
        'condecoraciones'=>$condecoraciones,
        'merito'=>$merito,
        'positivo'=>$positivo,
        'sanciones' =>$sanciones,
        'negativo' =>$negativo,
        'demerito'=>$demerito,
        'listas'=>$count_listas,
      ));

  }
  public function reporteAction(Request $request){
    $em               = $this   ->getDoctrine()->getManager();
    $categoria        = $request->query->get('categoria');
    $turno            = $request->query->get('turno');
    $calif_repo       = $em     ->getRepository('calificacionBundle:calificacion');

    if ($categoria != null and $turno != null ) {
      $listado = $calif_repo->getListado('2017',$categoria,$turno);

    }else{
      $listado = null;
    }

    $usuario  = 'william';
    $perfil   = 'administrador';

    return $this->render('calificacionBundle:default:reporte.html.twig',array(
        'usuario'   =>  $usuario,
        'perfil'    =>  $perfil,
        'listado'   =>  $listado,

      ) );
  }
  public function reporte_personaAction($id,$num){

    $em = $this->getDoctrine()->getManager();
    $calif_repo = $em->getRepository('calificacionBundle:calificacion');
    $persona    = $calif_repo->getPersona($id);
    $folios      = $calif_repo->getFolio($id);

    return $this->render('calificacionBundle:default:reporte_persona.html.twig',array(
        'id'=> $id,
        'persona'=>$persona,
        'folios'=>$folios,
        'num'=>$num,
      ));
  }
  public function perfil_profesionalAction($id){
    $em = $this->getDoctrine()->getManager();
    $calif_repo = $em->getRepository('calificacionBundle:calificacion');
    $niveles_academicos = $calif_repo->getNivelesAcademicos($id);
    $experiencia = $calif_repo->getExperiencia($id);
    $count_niveles = $calif_repo->countNiveles($id);
    $idiomas = $calif_repo->getIdiomas($id);
    return $this->render('calificacionBundle:default:perfil_profesional.html.twig',array(
      'niveles_academicos' =>$niveles_academicos,
      'experiencia' => $experiencia,
      'count_niveles'=>$count_niveles,
      'idiomas'=>$idiomas,
    ));
  }
  public function acto_adminAction(Request $request){

    $parametros = $request->request->all();
    $ascendidos = array();
    $retardos = array();
    $retirados = array();

    $em = $this->getDoctrine()->getManager();
    $calif_repo = $em->getRepository('calificacionBundle:calificacion');
    foreach ($parametros as $key => $value) {
      if (preg_match('/^acto-([0-9])/', $key))
      {
        $documento =  substr($key, 5,-1);
        if ($value =='Asciende') {
          $persona = $calif_repo->getPersona($documento);
          $array= array('apellidos'=>$persona['APELLIDOS'],  'documento'=>$documento,'acto'=>'Asciende');
          array_push($ascendidos,$array);
        }
        if ($value =='Retardo') {
          $array= array('documento'=>$documento,'acto'=>'Retardo');
          array_push($retardos,$array);
        }
         if ($value =='Retiro') {
          $array= array('documento'=>$documento,'acto'=>'Retiro');
          array_push($retirados,$array);
        }
      }
    }
    return $this->render('calificacionBundle:default:acto_admin.html.twig',
        array('parametros'=>$parametros,
          'ascendidos'=>$ascendidos,
          'retardos'=> $retardos,
          'retirados' => $retirados,
          )
      );
  }
}
