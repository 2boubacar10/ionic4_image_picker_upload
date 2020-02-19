<?php header('Access-Control-Allow-Origin: *'); ?>
<?php header('Access-Control-Allow-Headers: *'); ?>
<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set("log_errors", 1);
ini_set("error_log", "logs/erreurs.log");



if(isset($_POST['image'])){
$tableauImages = json_decode($_POST['image']);
//echo json_encode($tableauImages);

foreach ($tableauImages as $key => $value) {
	// baseFromJavascript will be the javascript base64 string retrieved of some way (async or post submited)
	$baseFromJavascript = $value;

	// $_POST['base64']; //your data in base64 'data:image/png....';
	// We need to remove the "data:image/png;base64,"
	$base_to_php = explode(',', $baseFromJavascript);
	// the 2nd item in the base_to_php array contains the content of the image
	$data = base64_decode($base_to_php[1]);
	$random_name = date("YmdHis").rand(1000,10000).".jpg";
	// here you can detect if type is png or jpg if you want
	$filepath = "images/".$random_name; // or image.jpg

	// Save the image in a defined path
	file_put_contents($filepath,$data);
}



/*

//code qui marche pour la première image

// baseFromJavascript will be the javascript base64 string retrieved of some way (async or post submited)
$baseFromJavascript = $tableauImages[0];

// $_POST['base64']; //your data in base64 'data:image/png....';
// We need to remove the "data:image/png;base64,"
$base_to_php = explode(',', $baseFromJavascript);
// the 2nd item in the base_to_php array contains the content of the image
$data = base64_decode($base_to_php[1]);
// here you can detect if type is png or jpg if you want
$filepath = "images/image2.png"; // or image.jpg

// Save the image in a defined path
file_put_contents($filepath,$data);

//fin code qui marche pour la première image
*/
}else{
	echo json_encode("aucune image n'a été envoyée");
}