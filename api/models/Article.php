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
        $query = "SELECT * FROM " . $this->table_name;
        
        switch($filter) {
            case 'popular':
                $query .= " ORDER BY views DESC";
                break;
            case 'editors_picks':
                $query .= " WHERE is_editors_pick = 1";
                break;
            default:
                $query .= " ORDER BY created_at DESC";
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    title = :title,
                    content = :content,
                    author = :author,
                    category = :category,
                    image_url = :image_url";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->content = htmlspecialchars(strip_tags($this->content));
        $this->author = htmlspecialchars(strip_tags($this->author));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->image_url = htmlspecialchars(strip_tags($this->image_url));

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":content", $this->content);
        $stmt->bindParam(":author", $this->author);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":image_url", $this->image_url);

        return $stmt->execute();
    }

    public function incrementViews($id) {
        $query = "UPDATE " . $this->table_name . "
                SET views = views + 1
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }
}
?>