<?php

namespace disanBundle\Entity;

/**
 * disan
 */

/**
 * @ORM\Entity(repositoryClass="\disanBundle\Repository\disanRepository")
 */

class disan
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
