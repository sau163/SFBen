<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Article.php';

$database = new Database();
$db = $database->getConnection();

$article = new Article($db);

$filter = isset($_GET['filter']) ? $_GET['filter'] : 'latest';
$stmt = $article->read($filter);
$num = $stmt->rowCount();

if($num > 0) {
    $articles_arr = array();
    $articles_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
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

        array_push($articles_arr["records"], $article_item);
    }

    http_response_code(200);
    echo json_encode($articles_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No articles found."));
}
?>