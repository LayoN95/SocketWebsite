<HTML>
<HEAD>
	<!--<link href="stylesheets/style.css" rel="stylesheet">-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="stylesheets/style.css" rel="stylesheet">

</HEAD>
<BODY>
                <h1 class="cover-heading">Wizualizacja</h1>

    <div class="menu">
            <a href="index.html">Strona Główna</a>
            <a href="dht-11.html">Wizualizacja</a>
            <a href="dht-11.html">Sensor DHT-11</a>
            <a href="control.html">Sterowanie</a>
              </div>
 
    <div class="container" style="height: 400px; width: 600px;">
        <canvas id="myChart"></canvas>
    </div>
    
        <script language="php"> 
        $servername = "localhost";
        $username = "SmartHome";
        $password = "raspberry";

        // Create connection
        $conn = new mysqli($servername, $username, $password);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echo "Connected successfully";
    </script>
             
    
    <script>
        //Database

        
        //Chart
        let myChart = document.getElementById('myChart').getContext('2d');
    
        
        //Oprions
        Chart.defaults.global.defaultFontFamily = 'Lato';
        Chart.defaults.global.defaultFontSize = 11;
        Chart.defaults.global.defaultFontColor = '#777';
        
        let massPopChart = new Chart(myChart, {
            type: 'line',
            data:{
                labels:['Boston', 'Worcester', 'Springfield', 'Lowel', 'Cambridge', 'New Bedford'],
                datasets:[{
                    label:'Population',
                    data:[
                        617594,
                        181045,
                        153060,
                        106519,
                        105162,
                        95072
                        ],
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderWidth:1,
                    borderColor:'#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor:'#000'
                }]
            },
            oprions:{
                title:{
                    distplay: true,
                    text: 'Largest Cities In Massachusetts',
                    fontSize:25
                },
                legend:{
                    display: true,
                    position:'right',
                    labels:{
                        fontColor:'#000'
                    }
                },
                layout:{
                    padding:{
                        left:50,
                        right:0,
                        botton:0,
                        top:0
                    }
                },
                tooltips:{
                    enabled:true
                }
            }
        });
               
    </script>
</BODY>
</HTML>
