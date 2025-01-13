<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Article.php';

$database = new Database();
$db = $database->getConnection();

$article = new Article($db);

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($id) {
    $stmt = $article->readSingle($id);

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);

        $article_item = array(
            "id" => $id,
            "title" => $title,
            "content" => $content,
            "author" => $author,
            "category" => $category,
            "image_url" => $image_url,
            "views" => $views,
            "created_at" => $created_at
        );

        http_response_code(200);
        echo json_encode($article_item);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Article not found."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid article ID."));
}
?>
