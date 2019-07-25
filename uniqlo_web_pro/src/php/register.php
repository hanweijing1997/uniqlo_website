
<?php
	$un = @$_POST["username"];
	$pw = @$_POST["password"];
	
	# -判断终止逻辑
	if($un ==='' || $pw === ''){
		die("字段不能为空");
	}
		
	# -连接数据库
	$server = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "gp12";
	
	$conn = mysqli_connect($server,$username,$password,$dbname);
	if(!$conn){
            $result = array( "state" => "error" , "stateCode" => 0);
            die( json_encode($result));
	}
	
	# -判断数据库中是否已存在数据
	$sql_select = "SELECT username FROM uniqlouser WHERE username='$un'";
	$res = mysqli_query($conn,$sql_select);
	// $res = mysqli_fetch_assoc($res);
	// echo json_encode($res);
	if(mysqli_num_rows($res)>0){
		$result = array( "state" => "error" , "stateCode" => 2);
            die(json_encode($result) );
	}
	
	
	# -插入数据
	$pw = md5($pw);
	$sql_insert = "INSERT INTO uniqlouser(
		username , password
	)VALUES(
		'$un' , '$pw'
	)";
	if(mysqli_query($conn,$sql_insert)){
		$result = array( "state" => "success" , "stateCode" => 1);
            die( json_encode($result) );
	}else{
		$result = array( "state" => "error" , "stateCode" => 3);
            die( json_encode($result) );
	}
	
?>