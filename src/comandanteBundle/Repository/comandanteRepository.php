<?php

namespace comandanteBundle\Repository;

/**
 * comandanteRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class comandanteRepository extends \Doctrine\ORM\EntityRepository
{
	public function getConceptos($identificacion){
   // conecta a la base de datos
		$em = $this->getEntityManager();
		$db = $em->getConnection();
		// query
		$query = "
			SELECT *
			FROM `concepto` as c
			WHERE c.identificacion = $identificacion
		
		";
		// prepara ejecuta y convierte en array
		$smtp = $db->prepare($query);
		$smtp->execute();

		return  $smtp->fetchAll();
	}
    public function getTodosConceptos(){
   // conecta a la base de datos
        $em = $this->getEntityManager();
        $db = $em->getConnection();
        // query
        $query = "
            SELECT *
            FROM `concepto` as c
        ";
        // prepara ejecuta y convierte en array
        $smtp = $db->prepare($query);
        $smtp->execute();

        return  $smtp->fetchAll();
    }

	public function insertConcepto(
		$id, $f_diligencia,$f_prox_a,$observaciones
		){

		$em = $this->getEntityManager('dbal2');
        $conn = $em->getConnection();
        $query = "
                SELECT * 
                FROM `concepto`
                WHERE `concepto`.`identificacion` = ".$id."
                AND `concepto`.f_ascenso = '".$f_prox_a."'
        " ;
        $smtp = $conn->prepare($query);
        $smtp->execute();
        $consulta= $smtp->fetchAll();

        if ($consulta) {
            
            
        }else{
             $insert = $conn->insert('concepto', 
          array(
                'identificacion'        => $id,
                'f_diligenciamiento'    => date('d/m/y'),
                'observaciones'         => $observaciones,
                'f_ascenso'             => $f_prox_a
            ));
             return $conn->lastInsertId();
        }
             
    // $insert2 = $conn->insert('indicador_concepto', 
    //       array(
    //             'id_concepto'				=>  $conn->lastInsertId(),
    //             'id_indicador' 				=> 	$id_indicador,
    //             'calificacion'				=> 	$calificacion,
    //             'f_ascenso'						=> 	$f_prox_a
    //         ));
    
	}
	public function getIndicadores()
	{
		$em = $this->getEntityManager('dbal2');
    $conn = $em->getConnection();
    $query = "SELECT * FROM indicadores";
    $smtp = $conn->prepare($query);
    $smtp->execute();
    return $smtp->fetchAll();
	}
    public function get_indicador_concepto($id_concepto)
    {
        $em = $this->getEntityManager('dbal2');
        $conn = $em->getConnection();
        $query = "
            SELECT * FROM `indicador_conceptos`  , `indicadores`
            WHERE  `id_concepto` = ".$id_concepto." 
            AND `indicador_conceptos`.id_indicador = `indicadores`.id_indicador
        ";
        $smtp = $conn->prepare($query);
        $smtp->execute();
        return $smtp->fetchAll();
        
    }
	public function insert_indicador_concepto($id_concepto,$id_indicador,$calificacion){
			$em = $this->getEntityManager('dbal2');
	    $conn = $em->getConnection();
	    $insert = $conn->insert('indicador_conceptos',array(
    		'id_concepto'=> $id_concepto ,
    		'id_indicador'=> $id_indicador,
    		'calificacion'=> $calificacion,
	  	));
	}
	public function update_concepto($id_concepto,$calificacion){
		$em = $this->getEntityManager('dbal2');
    $conn = $em->getConnection();
    $conn->update(
    	//tabla
    	'concepto', 
    	//values
    	array('calificacion' => $calificacion), 
    	//where
    	array('id_concepto' => $id_concepto 
    		));

	}
}
