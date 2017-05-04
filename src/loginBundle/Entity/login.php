<?php

namespace loginBundle\Entity;

/**
 * login
 */
/**
 * @ORM\Entity(repositoryClass="\loginBundle\Repository\loginRepository")
 */
class login
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

