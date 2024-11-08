<?php

class Autoloader
{
  private static $instance;

  private array $namespaces = [
    '\\'  => DIRECTORY_SEPARATOR,
  ];

  private function __construct()
  {
  }

  public static function getInstance(): self
  {
    if (self::$instance === null) {
      self::$instance = new self();
    }

    return self::$instance;
  }

  public function setPsr4(string $namespace, string $path)
  {
    $this->namespaces[$namespace] = $path;
  }

  public static function register()
  {
    \spl_autoload_register(function ($class) {
      $self = self::getInstance();
      $file =  str_replace(array_keys($self->namespaces), array_values($self->namespaces), $class);
      $file = __DIR__ . DIRECTORY_SEPARATOR . $file . '.php';

      if (!file_exists($file)) {
        return false;
      }

      require_once $file;
      return true;
    });
  }
}

Autoloader::getInstance()->setPsr4('Lib', 'lib');
Autoloader::register();

define('PROJECT_DIR', __DIR__);
