<?php

namespace matricesBundle\Entity;

/**
 * @ORM\Entity(repositoryClass="\matricesBundle\Repository\matrizRepository")
 */
/**
 * matriz
 */
class matriz
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

