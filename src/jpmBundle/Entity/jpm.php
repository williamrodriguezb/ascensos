<?php

namespace jpmBundle\Entity;

/**
 * jpm
 */
/**
*@ORM/Entity(repositoryClass="\jpmBundle\Repository\jpmRepository")
*/


class jpm
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
