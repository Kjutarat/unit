$(document).ready(function() {
    /*start sidebar bootstrap*/
    $('body').scrollspy({
        target: '.bs-docs-sidebar',
        offset: 40
    });
    /*end sidebar bootstrap*/

    //start event listener zone
    var unit,article,type;
    $('#practiceModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var question = button.data('question'); // Extract info from data-* attributes
        unit = button.data('unit');
        article = button.data('article');
        type = button.data('type');

        if (type == 1) {
            t = "ระหว่างการทดลอง";
        } else if (type == 2) {
            t = "ท้ายการทดลอง";
        }

        question = $("#" + question).html();
        question = "ข้อที่ " + question;
        var header = "ส่งคำตอบ " + t + " บทที่ " + unit;
        var logo = "<span class='glyphicon glyphicon-cloud-upload' aria-hidden='true'></span>";
        $('#practiceHeader').html(logo + " " + header);
        $('#practiceQuestion').html(question);
        //clear textarea 
        $('#practiceAnswer').val(null);
    })

    $("#sendAnswer").click(function() {
        var c = confirm("กรุณาตรวจสอบคำตอบให้เรียบร้อย คุณสามารถส่งคำตอบได้เพียงครั้งเดียวเท่านั้น");
        if (c == true) {
            var data = "mode=answer&unit="+unit+"&article="+article+"&type="+type+"&answer="+$("#practiceAnswer").val();
            sendPractice(data);
        }
    });
    //end event listener zone
});

//start function zone
function sendPractice(d) {
        //alert("mode=answer&unit="+$("#unit").val()+"&article="+$("#article").val()+"&type="+$("#type").val()+"&answer="+$("#answer").val());
        $.ajax({
            url: "http://"+window.location.host+"/moodle/mod/mysqlreport/service.php",
            type: "POST",
            data: d,
            success: function(result) {
                var split;
                split  = result.split(":");
                if(split[0] == "Success")
                {
                    var data;
                    data = "<div class='alert alert-success alert-dismissible'>";
                    data += "<button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>";
                    data += "<strong>"+split[0]+":</strong>"+split[1]+"</div>";
                    $("#status").html(data);
                    var myTimer = setInterval(function(){ 
                        $("#status").html(null);
                        clearInterval(myTimer); 
                    }, 5000);
                }
                else if(split[0] == "Error")
                {
                    var data;
                    data = "<div class='alert alert-danger alert-dismissible'>";
                    data += "<button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>";
                    data += "<strong>"+split[0]+":</strong>"+split[1]+"</div>";
                    $("#status").html(data);
                    var myTimer = setInterval(function(){ 
                        $("#status").html(null);
                        clearInterval(myTimer); 
                    }, 5000);
                }
            }
        });
    }
    //end function zone
