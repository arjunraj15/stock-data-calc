
const form = document.querySelector('#formEvent');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const fullReport = document.getElementById('fullReport');
const chart1 = document.getElementById('chart1');
const chart2 = document.getElementById('chart2');
const dataThirst1 = document.getElementById('datathirst1');
const dataThirst2 = document.getElementById('datathirst2');
//  console.log(chart2);
// document.getElementById('topstock').innerHTML = `<p> the highest stock value in the given time period of ${start} to ${end} is </p><h4>
// ${highestStockvalue} on ${date}<h4> `;
loadeventlistner();
function loadeventlistner(){
    form.addEventListener('submit',generateReport);
    fullReport.addEventListener('click',fullReportGenerator);
}
function generateReport(e)
{
    chart1.style.visibility = 'visible';
    chart2.style.visibility = 'visible';
    dataThirst1.style.visibility = 'hidden';
    dataThirst2.style.visibility = 'hidden';
    if(startDate.value === '' || endDate.value === '')
    {
        alert('Enter both the dates');
    }
    else
    {

        const start = startDate.value;
        const end = endDate.value;
        google.charts.load('current', { packages: ['line'] });
google.charts.setOnLoadCallback(drawLineChart);

    function drawLineChart() {
       
        $.ajax({
            url: "inputdata.json",
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var arrSales = [['Date', 'Open stock', 'Close stock']];    

               let highestStockvalue = '';
               let date = '';
               let lowest = '1000000';
               let date2 = '';

                $.each(data, function (index, value) {
                    console.log(startDate.value);
                    if(start <= value.date && end >=value.date)
                    {
                         if(highestStockvalue <= value.high )
                        {
                            highestStockvalue = value.high;
                            date = value.date;

                        }
                    if(lowest >= value.high )
                        {
                            lowest = value.low;
                            date2 = value.date;

                        }
                    
                        arrSales.push([value.date, value.open, value.close]);
                    }
                   
                });

               
                var options = {
                    chart: {
                        title: `Monthly open stock vs close stock between ${start} to ${end}`,
                        subtitle: `the highest stock value is ${highestStockvalue} on ${date} and lowest stock value is ${lowest} on ${date2}`
                    },
                    axes: {
                        x: {
                            0: { side: 'top'}   
                        }
                    }
                };

              
                var figures = google.visualization.arrayToDataTable(arrSales)

                
                var chart = new google.charts.Line(document.getElementById('chart1'))

            
                chart.draw(figures, google.charts.Line.convertOptions(options));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Got an Error');
            }
        });
    }
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawVisualization);

    function drawVisualization() {
    
      $.ajax({
        url: "inputdata.json",
        dataType: "json",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var arrSales = [['Date' , 'open stock' , 'highest rate','lowest rate','close stock','average']];    

           
            $.each(data, function (index, value) {
                let highestStockvalue = '';
                let date = '';
                if(start <= value.date && end >=value.date)
                {
                    if(highestStockvalue <= value.high )
                        {
                            highestStockvalue = value.high;
                            date = value.date;

                        }
                    
                    //highestStockvaluefun(highestStockvalue , date);
                let avg = (value.open + value.close)/2;
                arrSales.push([value.date, value.open,value.high ,value.low,value.close,avg]);
                }
            });

      var options = {
        title : `over all stock chart from ${start} to ${end}`,
        vAxis: {title: 'Stock value'},
        hAxis: {title: 'Date'},
        seriesType: 'bars',
        series: {4: {type: 'line'}}       
     };

        var figures = google.visualization.arrayToDataTable(arrSales)
        var chart = new google.visualization.ComboChart(document.getElementById('chart2'));
      
        chart.draw(figures, google.charts.Line.convertOptions(options));
       
      
       
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('Got an Error');
    }
        // console.log(highestStockvalue);
        // console.log(date);
});
    }
        
    }
    e.preventDefault();
}
function fullReportGenerator(e)
{
    chart1.style.visibility = 'visible';
    chart2.style.visibility = 'visible';
    dataThirst1.style.visibility = 'hidden';
    dataThirst2.style.visibility = 'hidden';
    google.charts.load('current', { packages: ['line'] });
  google.charts.setOnLoadCallback(drawLineChart);

    function drawLineChart() {
        $.ajax({
            url: "inputdata.json",
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var arrSales = [['Date', 'Open stock', 'Close stock']];    

                let highestStockvalue = '';
                let date = '';
                let lowest = '1000000';
                let date2 = '';
                $.each(data, function (index, value) {
                    
                    if(highestStockvalue <= value.high )
                    {
                        highestStockvalue = value.high;
                        date = value.date;

                    }
                if(lowest >= value.high )
                    {
                        lowest = value.low;
                        date2 = value.date;

                    }
                
                    
                        arrSales.push([value.date, value.open, value.close]);
                    
                   
                });

               
                var options = {
                    chart: {
                        title: 'Monthly open stock vs close stock',
                        subtitle: `the highest stock value is ${highestStockvalue} on ${date} and lowest stock value is ${lowest} on ${date2}`
                    },
                    axes: {
                        x: {
                            0: { side: 'top'}   
                        }
                    }
                };

              
                var figures = google.visualization.arrayToDataTable(arrSales)

                
                var chart = new google.charts.Line(document.getElementById('chart1'))

               
                chart.draw(figures, google.charts.Line.convertOptions(options));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('Got an Error');
            }
        });
    }
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawVisualization);

    function drawVisualization() {
     
      $.ajax({
        url: "inputdata.json",
        dataType: "json",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var arrSales = [['Date' , 'open stock' , 'highest rate','lowest rate','close stock','average']];    

           
            $.each(data, function (index, value) {
                let avg = (value.open + value.close)/2;
                arrSales.push([value.date, value.open,value.high ,value.low,value.close,avg]);
            });

      var options = {
        title : `over all stock chart`,
        vAxis: {title: 'Stock value'},
        hAxis: {title: 'Date'},
        seriesType: 'bars',
        series: {4: {type: 'line'}}        };

        var figures = google.visualization.arrayToDataTable(arrSales)
        var chart = new google.visualization.ComboChart(document.getElementById('chart2'));
      
        chart.draw(figures, google.charts.Line.convertOptions(options));
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('Got an Error');
    }
 });
    }

 
}

