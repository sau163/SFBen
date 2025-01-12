<?php
class Database {
    private $host = "127.0.0.1"; // Matches 'host' in config.inc.php
    private $db_name = "sfben_db"; // Replace with your actual database name
    private $username = "root"; // Matches 'user' in config.inc.php
    private $password = ""; // Matches 'password' in config.inc.php
    private $port = 3307; // Matches 'port' in config.inc.php
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Database connection successful.";
        } catch(PDOException $e) {
            echo "Connection Error: " . $e->getMessage();
        }
        return $this->conn;
    }
}
?>
