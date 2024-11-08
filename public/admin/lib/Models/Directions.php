<?php

namespace Lib\Models;

enum Directions: int
{
  case UP    = 0b0000;
  case DOWN  = 0b0010;
  case LEFT  = 0b0100;
  case RIGHT = 0b1000;

  static public function a()
  {
    $a = self::RIGHT->value | self::LEFT->value;
  }
}

