<?php

namespace ldapBundle\Entity;

/**
 * ldap
 */
/**
 * @ORM\Entity(repositoryClass="\ldapBundle\Repository\ldapRepository")
 */
class ldap
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

