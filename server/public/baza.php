<?php 
$user = 'SmartHome';
$pass = 'raspberry';
$dbname = 'SmartHome';
host = 'localhost';

/* zapytanie do konkretnej tabeli */ 
$wynik = mysql_query("SELECT * FROM DHT11") 
or die('Błąd zapytania'); 

/* 
wyświetlamy wyniki, sprawdzamy, 
czy zapytanie zwróciło wartość większą od 0 
*/ 
if(mysql_num_rows($wynik) > 0) { 
    /* jeżeli wynik jest pozytywny, to wyświetlamy dane */ 
    echo "<table cellpadding=\"2\" border=1>"; 
    while($r = mysql_fetch_assoc($wynik)) { 
        echo "<tr>"; 
        echo "<td>".$r['']."</td>"; 
        echo "<td>".$r['e']."</td>"; 
        echo "<td> 
       <a href=\"index.php?a=del&amp;id={$r['id']}\">DEL</a> 
       <a href=\"index.php?a=edit&amp;id={$r['id']}\">EDIT</a> 
       </td>"; 
        echo "</tr>"; 
    } 
    echo "</table>"; 
} 

?>