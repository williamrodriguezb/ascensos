<?php

namespace calificacionBundle\Entity;

/**
 * calificacion
 */

/**
 * @ORM\Entity(repositoryClass="\calificacionBundle\Repository\calificacionRepository")
 */
class calificacion
{
    /**
     * @var int
     */
    private $id;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }
}

