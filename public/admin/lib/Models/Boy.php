<?php

namespace Lib\Models;

class Boy
{
  /**
   * @param string $id
   * @param string[] $imgPaths
   * @param string[] $soundPaths
   */
  public function __construct(
    private string $id,
    private array $imgPaths,
    private array $soundPaths,
  ) {
  }

  static public function fromConfig(array $config)
  {
    return new self($config['id'], $config['imgs'], $config['sounds']);
  }

  public function getId(): string
  {
    return $this->id;
  }

  public function  getImgPaths(): array
  {
    return $this->imgPaths;
  }

  public function  getSoundPaths(): array
  {
    return $this->soundPaths;
  }
}
