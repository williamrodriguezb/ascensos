<?php

namespace matricesBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('matricesBundle:Default:index.html.twig');
    }
    public function getMatrizAction()
    {
    	$em = $this->getDoctrine()->getManager('dbal2');
    	$matriz_repo = $em->getRepository('matricesBundle:matriz');
    	$matriz = $matriz_repo->getMatriz();
    	$indicadores = $matriz_repo->getIndicadores(1);
    	$parametros  = $matriz_repo->getParametros(1);

        return $this->render('matricesBundle:Default:matriz.html.twig',
        		array(
        			'matriz'=>$matriz,
        			'indicadores'=>$indicadores,
        			'parametros'=>$parametros,
        			)
        	);
    }

    public function editMatrizAction()
    {
        return $this->render('matricesBundle:Default:insertaMatriz.html.twig');
    }

    public function actualizaMatrizAction(Request $request)
    {
        $matriz = $request->get('matriz');
        $em = $this->getDoctrine()->getManager('dbal2');
        $matriz_repo = $em->getRepository('matricesBundle:matriz');
        // $updateEstado = $matriz_repo->updateEstado();

       var_dump($request->get('estado'));
    }
}
