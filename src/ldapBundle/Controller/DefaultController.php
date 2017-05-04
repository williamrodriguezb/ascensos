<?php

namespace ldapBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
    	 $em   = $this->getDoctrine()->getManager();
         $ldap = $em->getRepository("ldapBundle:ldap");
        return $this->render('ldapBundle:Default:index.html.twig');
    }
}
