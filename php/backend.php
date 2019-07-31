<?php
    header('Content-Type: text/html; charset=utf-8');

    $dbh = new PDO('mysql:dbname=magnetic_board;host=127.0.0.1', 'root', '');
    $dbh -> query("SET NAMES 'utf8'");
    $postdata = file_get_contents("php://input");
    $decoded = json_decode($postdata);

    if(isset($decoded)) {
        $action  = $decoded->action;

        switch ($action) {
            case "createMagnet":
                $query = $dbh->prepare('INSERT INTO `kartki` (`board_name`, `x`, `y`, `width`, `height`, `zindex`, `content`, `mileage`) VALUES (:boardname, \''.$decoded->x.'\', \''.$decoded->y.'\', \''.$decoded->width.'\', \''.$decoded->height.'\', \''.$decoded->zindex.'\', :content, \''.$decoded->mileage.'\');');
                $query->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                $query->bindValue(':content', $decoded->content, PDO::PARAM_STR);
                $query->execute();

                if ($decoded->mileage == 1) {
                    $query2 = $dbh->prepare('INSERT INTO `tablice` (`board_name`, `mileage`) VALUES (:boardname, \''.$decoded->mileage.'\');');
                    $query2->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                    $query2->execute();
                } else {
                    $query2 = $dbh->prepare('UPDATE `tablice` SET `mileage` = \''.$decoded->mileage.'\' WHERE `tablice`.`board_name` = :boardname;');
                    $query2->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                    $query2->execute();
                }
                break;
            case "updatePosition":
                $query = $dbh->prepare('UPDATE `kartki` SET `x` = \''.$decoded->x.'\', `y` = \''.$decoded->y.'\', `zindex` = \''.$decoded->zindex.'\' WHERE `kartki`.`board_name` = :boardname AND `kartki`.`mileage` = \''.$decoded->mileage.'\';');
                $query->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                $query->execute();
                break;
            case "updateZindex":
                $query = $dbh->prepare('UPDATE `kartki` SET `zindex` = \''.$decoded->zindex.'\' WHERE `kartki`.`board_name` = :boardname AND `kartki`.`mileage` = \''.$decoded->mileage.'\';');
                $query->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                $query->execute();
                break;
            case "updateSize":
                $query = $dbh->prepare('UPDATE `kartki` SET `width` = \''.$decoded->width.'\', `height` = \''.$decoded->height.'\', `zindex` = \''.$decoded->zindex.'\' WHERE `kartki`.`board_name` = :boardname AND `kartki`.`mileage` = \''.$decoded->mileage.'\';');
                $query->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                $query->execute();
                break;
            case "updateContent":
                $query = $dbh->prepare('UPDATE `kartki` SET `content` = :content WHERE `kartki`.`board_name` = :boardname AND `kartki`.`mileage` = \''.$decoded->mileage.'\';');
                $query->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                $query->bindValue(':content', $decoded->content, PDO::PARAM_STR);
                $query->execute();
                break;
            case "removeMagnet":
                $query = $dbh->prepare('DELETE FROM `kartki` WHERE `kartki`.`board_name` = :boardname AND `kartki`.`mileage` = \''.$decoded->mileage.'\';');
                $query->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                $query->execute();
                break;
            case "getData":
                $database = @new mysqli("localhost", "root", "", "magnetic_board");

                if($database-> connect_errno!=0) {
                    echo "Error: ".$database->connect_errno." Opis: ".$database->connect_error;
                } else {
                    $sql = $dbh->prepare('SELECT * FROM `kartki` WHERE `kartki`.`board_name` = :boardname;');
                    $sql->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                    $sql->execute();

                    $records = array();

                    while($row=$sql->fetch(PDO::FETCH_OBJ)) {
                        $records[] = $row;
                    }
                    echo json_encode($records);
                }
                break;
            case "getMileage":
                $database = @new mysqli("localhost", "root", "", "magnetic_board");

                if($database-> connect_errno!=0) {
                    echo "Error: ".$database->connect_errno." Opis: ".$database->connect_error;
                } else {
                    $sql = $dbh->prepare('SELECT * FROM `tablice` WHERE `tablice`.`board_name` = :boardname;');
                    $sql->bindValue(':boardname', $decoded->board_name, PDO::PARAM_STR);
                    $sql->execute();

                    $records = array();

                    while($row=$sql->fetch(PDO::FETCH_OBJ)) {
                        $records[] = $row;
                    }
                    echo json_encode($records);
                }
                break;
                break;
            default:
                echo "Error with type of action! Contact with administrator.";
                break;
        }
    } else {
        echo "Error! Please check your connection or contact with administrator.";
    }
?>