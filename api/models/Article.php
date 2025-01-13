<?php
class Article {
    private $conn;
    private $table_name = "articles";

    public $id;
    public $title;
    public $content;
    public $author;
    public $category;
    public $image_url;
    public $views;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read($filter = 'latest') {
        $query = "SELECT id, title, author, category, image_url, views, created_at 
                  FROM " . $this->table_name;
        
        switch ($filter) {
            case 'popular':
                $query .= " ORDER BY views DESC LIMIT 20";
                break;
            case 'editors_picks':
                $query .= " WHERE is_editors_pick = 1 LIMIT 20";
                break;
            default:
                $query .= " ORDER BY created_at DESC LIMIT 20";
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readSingle($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }
}
?>