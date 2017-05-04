<?php

namespace calificacionBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\HttpFoundation\Request;
// ...
 
public function contactAction(Request $request)
{
   $defaults = array(
    'dueDate' => new \DateTime('tomorrow'),
);

$form = $this->createBuilder(FormType::class, $defaults)
    ->add('task', TextType::class)
    ->add('dueDate', DateType::class)
    ->getForm();
    // ... renderiza el formulario ...
    return $form
}