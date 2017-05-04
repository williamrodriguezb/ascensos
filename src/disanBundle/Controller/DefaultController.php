<?php

namespace disanBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    public function disanAction()
    {
        $usuario = 'william';
        $correo = 'william.rodriguez.b';
        $perfil = 'administrador';
        return $this->render('disanBundle:Default:disan.html.twig', array(
               'usuario' => $usuario,
                'correo'  => $correo,
                'perfil'   => $perfil, 
            )
        );
    }
    public function juntas_medicasAction(Request $request, $plantilla = true)
    {
        $usuario = 'william';
        $correo = 'william.rodriguez.b';
        $perfil = 'administrador';
//      buscador de personas
        $documento      = $request->get('documento');
        $apellidos      = $request->get('apellidos');
        $nombres        = $request->get('nombres');
        $categoria      = $request->get('categoria');
        $listado        = null;

        if ($documento != null  or $apellidos != null or $nombres != null 
        or  $categoria != null) {
          $em           =   $this->getDoctrine()->getManager();
          $db           =   $em->getConnection();
          $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
          $listado      =   $calif_repo->buscaPersona($documento,$apellidos,$nombres,$categoria);
          $empleado     =   null;
        }

        $identificacion = $request->get('id');
           
        if ($identificacion !=null) {
            $em        = $this          ->getDoctrine()->getManager();
            $disanRepo  = $em           ->getRepository("disanBundle:disan");
            $caliRepo   = $em           ->getRepository("calificacionBundle:calificacion");
            $aptitud    = $disanRepo    ->getAptitud($identificacion);   
            $persona    = $caliRepo     ->getPersona($identificacion);
        }else{
            $aptitud    = null;
            $persona    = null;
            $folio      = null;
        }
        return $this->render('disanBundle:Default:juntas_medicas.html.twig', array(
            'usuario'           =>      $usuario,
            'correo'            =>      $correo,
            'perfil'            =>      $perfil,
            'persona'           =>      $identificacion, 
            'aptitud'           =>      $aptitud,
            'persona_confirm'   =>      $persona,
            'plantilla'         =>      $plantilla,
            'listado'           =>      $listado,
            )
        );
    }
    public function ingresa_aptitudAction(Request $request,$id=null){
        $identificacion = $id;
        // buscador
        $documento      = $request->get('documento');
        $apellidos      = $request->get('apellidos');
        $nombres        = $request->get('nombres');
        $categoria      = $request->get('categoria');
        $listado        = null;

    if ($identificacion==null) {
      $persona   = null;
      $mando     = null;
      $aptitud      =   null;
    }else{
      $em           =   $this ->getDoctrine()->getManager();
      $db           =   $em->getConnection();
      $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
      $disan_repo   =   $em->getRepository("disanBundle:disan");
      $jpm_repo     =   $em->getRepository("jpmBundle:jpm");
      $persona      =   $calif_repo->getPersona($identificacion);
      $mando        =   $calif_repo->getMando($identificacion);
      $aptitud      =   $disan_repo->getAptitud($identificacion);
    }

    // buscador de personas
     if ($documento != null  or $apellidos != null or $nombres != null 
        or  $categoria != null) {
      $em           =   $this->getDoctrine()->getManager();
      $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
      $listado      =   $calif_repo->buscaPersona($documento,$apellidos,$nombres,$categoria);
      $empleado     =   null;
    }
        return $this->render('disanBundle:default:ingresa_certificacion.html.twig',array(
                'perfil'=>'admin',
                'usuario'=>'william',
                'listado'=>$listado,
                'persona'=>$persona,
                'id'=> $id,
            ));
}

public function estado_saludAction(Request $request,$plantilla=true){

    $documento      = $request->get('documento');
    $apellidos      = $request->get('apellidos');
    $nombres        = $request->get('nombres');
    $categoria      = $request->get('categoria');
    $listado        = null;

     $id = $request->get('id');

    if ($documento != null  or $apellidos != null or $nombres != null 
    or  $categoria != null){
        $em           =   $this->getDoctrine()->getManager();
        $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
        $listado      =   $calif_repo->buscaPersona($documento,$apellidos,$nombres,$categoria);
    }

    if ($id != null) {
        $em           =   $this->getDoctrine()->getManager();
        $disan_repo   =   $em->getRepository('disanBundle:disan');
        $estado_salud =   $disan_repo->getEstadoSalud($id); 
    }else{
        $estado_salud =  null;
    }

    

    return $this->render('disanBundle:default:estado_salud.html.twig',array(
                'perfil'=>'admin',
                'usuario'=>'william',
                'listado'=>$listado,
                'persona'=> $id,
                'plantilla' => $plantilla,
                'estado_salud' => $estado_salud
            ));

    var_dump($estado_salud);
    die();
}
    public function create_certificacion_fisicaAction(Request $request,$id=null){
        $aptitud        = $request->get('aptitud');
        $retardo        = $request->get('retardo');
        $f_retardo      = $request->get('f_retardo');
        $junta          = $request->get('junta');
        $f_junta        = $request->get('f_junta');
        $j_decision     = $request->get('j_decision');
        $comite         = $request->get('comite');
        $f_comite       = $request->get('f_comite');
        $c_decision     = $request->get('c_decision');
        $tribunal       = $request->get('tribunal');
        $f_tribunal     = $request->get('f_tribunal');
        $t_decision     = $request->get('t_decision');
        $observaciones  = $request->get('observaciones');
        // $cedula         = $id;
        $em = $this->getDoctrine()->getManager('dbal2');
        $disan_repo =  $em->getRepository("disanBundle:disan");
        $crear_certificacion = $disan_repo->create_certificacion(
            $id,
            $aptitud,$retardo,
            $f_retardo,$junta,
            $f_junta,$j_decision ,
            $comite, $f_comite ,
            $c_decision,$tribunal,
            $f_tribunal,$t_decision,
            $observaciones
        );
        return $this->redirectToRoute('disanAptitud',array('persona'=>$id)) ;
    }

    public function ver_certificacionAction(Request $request,$id,$plantilla=true){

        $documento      = $request->get('documento');
        $apellidos      = $request->get('apellidos');
        $nombres        = $request->get('nombres');
        $categoria      = $request->get('categoria');
      

        if ($documento != null  or $apellidos != null or $nombres != null 
        or  $categoria != null) {
            $em           =   $this->getDoctrine()->getManager();
            $db           =   $em->getConnection();
            $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
            $listado      =   $calif_repo->buscaPersona($documento,$apellidos,$nombres,$categoria);
        }else{
            $listado = null;
           
        }
    if ($id != null) {
        
    }else{
         $certificacion=null;
    }
        $em = $this->getDoctrine()->getEntityManager('dbal2');
        $disan_repo = $em->getRepository('disanBundle:disan');
        $certificacion = $disan_repo->getCertificacion($id);
        return $this->render('disanBundle:Default:ver_certificacion.html.twig',array(
                'certificaciones'=>$certificacion,
                'perfil'=>'admin',
                'usuario'=>'william',
                'listado'=> $listado,
                'plantilla'=>$plantilla
            ));
    }

}
