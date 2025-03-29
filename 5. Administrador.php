<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $target_dir = "Imagenes/";
    $target_file = $target_dir . basename($_FILES["imagen"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["imagen"]["tmp_name"]);
    if ($check !== false) {
        echo "El archivo es una imagen - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "El archivo no es una imagen.";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Lo sentimos, el archivo ya existe.";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["imagen"]["size"] > 500000) {
        echo "Lo sentimos, tu archivo es demasiado grande.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo "Lo sentimos, solo se permiten archivos JPG, JPEG, PNG & GIF.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Lo sentimos, tu archivo no fue subido.";
    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
            echo "El archivo " . basename($_FILES["imagen"]["name"]) . " ha sido subido.";
        } else {
            echo "Lo sentimos, hubo un error subiendo tu archivo.";
        }
    }
} else {
    echo "Método no permitido.";
}
?>
