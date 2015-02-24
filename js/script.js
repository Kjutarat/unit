$(document).ready(function() {
    /*start sidebar bootstrap*/
    $('body').scrollspy({
        target: '.bs-docs-sidebar',
        offset: 40
    });
    /*end sidebar bootstrap*/

    //start event listener zone
    $('#exampleModal').on('show.bs.modal', function(event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var question = button.data('question'); // Extract info from data-* attributes
            var unit = button.data('unit');
            var article = button.data('article');
            var type = button.data('type');

            question = $("#"+question).text();
            alert(question+unit+article+type);
            callPractice(question,unit,article,type)
        })
        //end event listener zone
});

//start function zone
function callPractice(q,u,a,t) {
        //alert("mode=log&code="+$('#textareaCode').val()+"&unit="+$('#unit').val()+"&article="+$('#article').val()+"&type="+$('#type').val());
        $.ajax({
            url: "http://"+window.location.host+"/moodle/mod/mysqlexp/practice.php",
            type: "POST",
            data: "question="+q+"&unit="+u+"&article="+a+"&type="+t,
            success: function(result) {
                alert(result);
            }
        });
    }
    //end function zone
