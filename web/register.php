<?php
// MySQL 데이터베이스 연결 설정
$servername = "localhost"; // MySQL 서버 주소
$username = "your_username"; // MySQL 사용자 이름
$password = "your_password"; // MySQL 비밀번호
$dbname = "your_database_name"; // 사용할 데이터베이스 이름

// 사용자가 입력한 정보 가져오기
$userName = $_POST['username'];
$password = $_POST['password'];

// MySQL 데이터베이스에 연결
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else {
    echo "Connection successful!";
}

// 사용자 정보를 데이터베이스에 저장하는 쿼리 실행
$sql = "INSERT INTO users (username, password) VALUES ('$userName', '$password')";
if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// MySQL 연결 닫기
$conn->close();
?>
