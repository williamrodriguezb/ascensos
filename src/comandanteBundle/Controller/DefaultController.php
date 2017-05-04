<?php

namespace comandanteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class DefaultController extends Controller
{
    public function indexAction(Request $request)
    {
    	//renderiza pagina de inicio del bundle comandante
        $usuario = 'william';
        $correo = 'william.rodriguez.b';
        $perfil = 'administrador';
        return $this->render('comandanteBundle:Default:comandante.html.twig', array(
        		'usuario' 	=> $usuario,
                'correo'  	=> $correo,
                'perfil'   	=> $perfil, 
        	) );
    }
    public function consultaAction(Request $request){
        $documento      = $request->get('documento');
        $identificacion = $request->query->get('id');
        $apellidos      = $request->get('apellidos');
        $nombres        = $request->get('nombres');
        $categoria      = $request->get('categoria');
        $metodo         = $request->getMethod();
        $listado        = null;
        $list_conceptos = null;

        $accion  = '';

    //VALIDACIONES
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
    if ($documento != null  or $apellidos != null or $nombres != null 
        or  $categoria != null) {
      $em           =   $this ->getDoctrine()->getManager();
      $db           =   $em->getConnection();
      $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
      $listado      =   $calif_repo->buscaPersona($documento,$apellidos,$nombres,$categoria);
      $empleado     =   null;
    }
         // if ($identificacion != null) {
         //    $em  = $this->get('doctrine')->getManager('dbal2');
         //   $comand_repo    = $em->getRepository('comandanteBundle:comandante');
         //    $conceptos      =    $comand_repo->getConceptos($identificacion);
         //  }
     return $this->render('comandanteBundle:Default:consulta.html.twig', array(
            'perfil'	=>'admin',
            'usuario' => 'william',
            'persona' => $persona,
            'listado' => $listado,
            'listado_conceptos' => $list_conceptos,

        ) );
    }
    public function btn_conceptoAction($identificacion=null){
  		$em           =   $this ->getDoctrine()->getManager('dbal2');
      $db           =   $em->getConnection();
      $comand_repo  =   $em->getRepository("comandanteBundle:comandante");
      $concepto 		= 	$comand_repo->getConceptos($identificacion);


      return $this->render('comandanteBundle:Default:btn-concepto.html.twig', array(
      		'concepto'=>$concepto,
      		'id'=> $identificacion,
        ) );
    }
    public function crear_conceptoAction(Request $request)
    {
        // echo($request->query->get('id'));
	    $em           =   $this ->getDoctrine()->getManager();
	    $em_mysql           =   $this ->getDoctrine()->getManager('dbal2');
	    $calif_repo   =   $em->getRepository("calificacionBundle:calificacion");
	    $persona      =   $calif_repo->getPersona($request->query->get('id'));

	    $comand_repo = $em_mysql->getRepository('comandanteBundle:comandante');
	    $indicadores = $comand_repo->getIndicadores();
	    return $this->render('comandanteBundle:default:crear_concepto.html.twig',array(
	            'persona'=>$persona,
	            'perfil' =>'ADMIN',
	            'usuario' =>'WILLIAM',
	            'id'   => $request->query->get('id'),
	            'indicadores' => $indicadores,
	        ));
    }
   public function insertar_conceptoAction(Request $request)
  {
    $id             = $request->get('id');
    $f_diligencia   = $request->get('f_diligenciamiento');
    $f_prox_a       = $request->get('f_prox_a');
    $observaciones  = $request->get('observaciones');

    $dato = explode('/', $f_prox_a);
    $fecha = date("Y-m-d", strtotime("$dato[2]-$dato[1]-$dato[0]"));
    $em  = $this ->getDoctrine()->getManager('dbal2');
    $comand_repo = $em->getRepository('comandanteBundle:comandante');
    $id_concepto = $comand_repo->insertConcepto($id,$f_diligencia,$fecha,$observaciones);

    $indi_total= 17;
    $calificacion_final = 0;
    for ($i=1; $i < $indi_total; $i++) { 
      $calificacion = $request->get($i);
      // var_dump($id_concepto);
      // die();

      if ($id_concepto == null) {
         return new Response ('ya se encuentra creado un concepto para este tiempo de ascenso');
      }else{

        $comand_repo->insert_indicador_concepto($id_concepto,$i,$calificacion);
         $calificacion_final += $request->get($i);
      }
     
    }
    $calificacion_concepto = $calificacion_final/16;
    if ($calificacion_concepto==5) {
    	$calificacion_final = "EXCELENTE";
    }elseif($calificacion_concepto<=4){
    	$calificacion_final = "REGULAR";
    }elseif($calificacion_concepto<=3){
    	$calificacion_final = "BUENO";
    }elseif($calificacion_concepto<=2){
    	$calificacion_final = "MUY BUENO";
    }elseif($calificacion_concepto<=1){
    	$calificacion_final = "DEFICIENTE";
    }

    $actualiza = $comand_repo->update_concepto($id_concepto,$calificacion_final);

    return $this->redirectToRoute('pdfconcepto',array('id'=>$id,'concepto'=>$id_concepto));
  }
  public function ver_conceptoAction(Request $request){
  	$identificacion = $request->get('id') ;
	 	$em  = $this ->getDoctrine()->getManager('dbal2');
    $comand_repo = $em->getRepository('comandanteBundle:comandante');
    $conceptos = $comand_repo->getConceptos($identificacion);


  	return $this->render('comandanteBundle:Default:ver_conceptos.html.twig',array(
  			'perfil'=>'ADMIN',
  			'usuario'=>'william',
  			'id'=>$identificacion,
  			'conceptos'=>$conceptos,
  		));

  }

  public function pdf_conceptoAction($id,$concepto){
    $em_dbal = $this->getDoctrine()->getEntityManager('dbal2');
    $em= $this->getDoctrine()->getEntityManager();
      $comand_repo = $em_dbal->getRepository('comandanteBundle:comandante');
    $calif_repo = $em->getRepository('calificacionBundle:calificacion');


    $persona = $calif_repo->getPersona($id);
    $ind_concepto = $comand_repo->get_indicador_concepto($concepto);
    $conceptos = $comand_repo->getTodosConceptos();

    $pdf = $this->get('knp_snappy.pdf');
    $filename = 'concepto- '.$persona['APELLIDOS'].'-'. $persona['NOMBRES'];
    $html =  $this->renderView('comandanteBundle:default:pdfconcepto.html.twig',array(
        'persona'=>$persona,
        'ind_concepto' =>$ind_concepto, 
        'conceptos'=>$conceptos,
            //..Send some data to your view if you need to //
        ));
     return new Response(
            $pdf->getOutputFromHtml($html),
            200,
            array(
                'Content-Type'          => 'application/pdf',
                'Content-Disposition'   => 'inline; filename="'.$filename.'.pdf"'
            )
        );
    die();
  }
  public function conceptoAction($id,$concepto)
  {
    $em_dbal = $this->getDoctrine()->getEntityManager('dbal2');
    $em= $this->getDoctrine()->getEntityManager();
    $comand_repo = $em_dbal->getRepository('comandanteBundle:comandante');
    $calif_repo = $em->getRepository('calificacionBundle:calificacion');
    $persona = $calif_repo->getPersona($id);
    $ind_concepto = $comand_repo->get_indicador_concepto($concepto);
    // var_dump($indicadores);
    // die();

    return $this->render('comandanteBundle:default:concepto.html.twig',array(
        'persona'=>$persona,
        'ind_concepto' =>$ind_concepto, 
      ));

    
  }





  public function prueba_ldapAction(){

// ejemplo de autenticación
$ldaprdn  = 'william.rodriguez.b';     // ldap rdn or dn
$ldappass = 'Andres1105*';  // associated password

// conexión al servidor LDAP
$ldapconn = ldap_connect("ldap.zimbra.armada.mil.com")
    or die("Could not connect to LDAP server.");

if ($ldapconn) {

    // realizando la autenticación
    $ldapbind = ldap_bind($ldapconn, $ldaprdn, $ldappass);

    // verificación del enlace
    if ($ldapbind) {
        echo "LDAP bind successful...";
    } else {
        echo "LDAP bind failed...";
    }

	}
}

}
