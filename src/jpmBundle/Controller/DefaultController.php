<?php

namespace jpmBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
class DefaultController extends Controller
{
    public function indexAction(Request $request, $plantilla = true){
        $usuario  = 'william';
        $correo   = 'william.rodriguez.b';
        $perfil   = 'administrador';

         // buscador
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
        if ($identificacion != null) {
          $em               =   $this->getDoctrine()->getManager();
          $emdbal2          =   $this->getDoctrine()->getManager();
          $cal_repo         =    $em->getRepository('calificacionBundle:calificacion');
          $jpm_repo         =   $emdbal2->getRepository('jpmBundle:jpm');
          $empleado         =   $cal_repo->getPersona($identificacion);
          $sanciones        =   $jpm_repo->getSanciones($identificacion);
          $investigaciones  =   $jpm_repo->getInvestigaciones($identificacion);
          $suspenciones     =   $jpm_repo->getSuspenciones($identificacion);
          $separaciones     =   $jpm_repo->getSeparaciones($identificacion);
        }else{
          $empleado         = null;
          $sanciones        = null;
          $investigaciones  = null;
          $suspenciones     = null;
          $separaciones     = null;
        }
        return $this->render('jpmBundle:default:jpm.html.twig', array(
            'persona'         =>  $empleado,
            'listado'         =>  $listado,
            'sanciones'       =>  $sanciones,
            'investigaciones' =>  $investigaciones,
            'suspenciones'    =>  $suspenciones,
            'separaciones'    =>  $separaciones,
            'plantilla'       =>  $plantilla,
            )
        );
    }
}
