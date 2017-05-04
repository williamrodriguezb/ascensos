<?php

namespace comandanteBundle\Entity;

/**
 * comandante
 */

/**
 * @ORM\Entity(repositoryClass="\comandanteBundle\Repository\comandanteRepository")
 */
class comandante
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

