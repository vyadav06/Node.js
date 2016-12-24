var eventObject = null;
var new_obj = [];

window.onload = () => {
    var userId = $("#userId").text();
    var d = new Date();
    var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = d.getMonth();
    var year = d.getFullYear();
    var first_date = month_name[month] + " 1 " + year;
    $("#date_here").text(month_name[month] + " " + year);

    var get_allData = {
        method: "GET",
        url: '/list/calendardata/' + userId
    };

    $.ajax(get_allData).then(function(allData) {
        eventObject = allData;
        new_obj = allData;
        get_calendar(first_date);
    });

    $(".update_month").click(function(e) {

        if ($(this).val() === "prev") {
            if (month == 0) {
                month = 11;
                year--;
            } else {
                month--;
            }
        } else if ($(this).val() === "next") {
            if (month == 11) {
                month = 0;
                year++;
            } else {
                month++;
            }
        }

        first_date = month_name[month] + " 1 " + year;
        $("#date_here").text(month_name[month] + " " + year);
        get_calendar(first_date);
    });

    $("#common_add_event_btn").click(() => {
        $("#common_add_event_modal").modal("toggle");
    });

    $("#add_monthly").click(() => {
        $("#warning").addClass('hidden')

        validateAddEvent().then(function(request_obj) {
            $.ajax(request_obj).then(function(response) {
                $("#common_add_event_modal").modal("toggle");
                window.location.reload(true);
            });
        }, function(ex) {
            $("#warning").text("");
            $("#warning").text(ex);
            $("#warning").removeClass('hidden');
        });
    });

    $(document.body).on('click', '.date', function() {
        var date_clicked = month_name[month] + " " + $(this).find(".desktop_date").text() + " " + year;
        if ($(this).data("date") !== undefined) {
            var dateSelected = "" + $(this).data("date");
            $("#task-heading").text("Tasks for the date " + dateSelected);
            var filteredEvents = [];
            filteredEvents.length = 0;
            filteredEvents = new_obj.filter(event => {
                return event.duedate === dateSelected;
            })

            var todo = [];
            var done = [];
            var backup = [];
            var doing = [];
            todo.length = 0;
            done.length = 0;
            backup.length = 0;
            doing.length = 0;
            if (filteredEvents.length > 0) {

                todo = filteredEvents.filter(event => {
                    return event.list === "todo";
                });

                done = filteredEvents.filter(event => {
                    return event.list === "done";
                });

                backup = filteredEvents.filter(event => {
                    return event.list === "backup";
                });

                doing = filteredEvents.filter(event => {
                    return event.list === "doing";
                });

                $("#todo-list").empty();
                $("#done-list").empty();
                $("#backup-list").empty();
                $("#doing-list").empty();
                if (todo.length > 0) {
                    for (var i = 0; i < todo.length; i++) {
                        $("#todo-list").append('<a href=/taskList/' + todo[i]._id + ' class="list-group-item"><span class="glyphicon glyphicon-chevron-right"></span>' + todo[i].title + '</a>');
                    }
                }

                if (done.length > 0) {
                    for (var i = 0; i < done.length; i++) {
                        $("#done-list").append('<a  href=/taskList/' + done[i]._id + ' class="list-group-item"><span class="glyphicon glyphicon-chevron-right"></span>' + done[i].title + '</a>');
                    }
                }

                if (backup.length > 0) {
                    for (var i = 0; i < backup.length; i++) {
                        $("#backup-list").append('<a  href=/taskList/' + backup[i]._id + ' class="list-group-item"><span class="glyphicon glyphicon-chevron-right"></span>' + backup[i].title + '</a>');
                    }
                }

                if (doing.length > 0) {
                    for (var i = 0; i < doing.length; i++) {
                        $("#doing-list").append('<a  href=/taskList/' + doing[i]._id + ' class="list-group-item"><span class="glyphicon glyphicon-chevron-right"></span>' + doing[i].title + '</a>');
                    }
                }
                $("#taskModal").modal("toggle")
            }
        }
    });
}

function validateAddEvent() {
    return new Promise(function(resolve, reject) {
        var title = $("#title").val();
        var list = $("#list").val();
        var duedate = $("#duedate").val();
        var priority = $("#priority").val();
        var creationdate = $("#creationdate").val();
        var description = $("#description").val();
        var id = $("#userId").text()

        if (duedate == "" || duedate == null) {
            reject("Invalid dueDate");
            return;
        }
        if (creationdate == "" || creationdate == null) {
            reject("Invalid creationdate");
            return;
        }

        if (title == "" || title == null || title == undefined) {
            reject("Invalid Title");
            return;
        }

        if (list == "" || list == null || list == undefined) {
            reject("Invalid list");
            return;
        }

        if (priority == "" || priority == null || priority == undefined) {
            reject("Invalid priority");
            return;
        }
        if (description == "" || description == null || description == undefined) {
            reject("Invalid Description");
            return;
        }

        $("#warning").addClass('hidden')

        var obj = {};
        obj.creatorID = id;
        obj.duedate = duedate;
        obj.creationdate = creationdate;
        obj.title = title;
        obj.list = list;
        obj.priority = priority;
        obj.description = description;

        var saveData = {
            method: 'POST',
            url: '/taskList/',
            contentType: "application/json",
            data: JSON.stringify(obj)
        };
        resolve(saveData);
    });

}

function get_calendar(first_date) {
    $("#calendar-dates").empty();
    var dt = new Date(first_date);
    var tmp = dt.toDateString();
    var first_day = tmp.substring(0, 3);    //Mon 
    var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var day_no = day_name.indexOf(first_day);   //1
    var all_days = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();

    var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    for (var c = 0; c <= 6; c++) {
        var days_item = document.createElement('div');
        $(days_item).addClass("flex-item days");
        days_item.innerHTML = days[c];
        $("#calendar-dates").append(days_item);
    }

    var c;
    for (c = 0; c <= 6; c++) {
        if (c == day_no) {
            break;
        }
        var days_item = document.createElement('div');
        $(days_item).addClass("flex-item empty");
        $("#calendar-dates").append(days_item);
    }

    for (var i = 1; i <= all_days; i++) {
        var days_item = document.createElement('div');
        $(days_item).addClass("flex-item date");
        var mobile_date = document.createElement('span');
        $(mobile_date).addClass("mobile_date");
        var desktop_date = document.createElement('span');
        $(desktop_date).addClass("desktop_date");
        var d = day_name[c];
        c++;
        if (c == 7) c = 0;

        var currentDate = new Date();
        if (i == currentDate.getDate() && dt.getMonth() == currentDate.getMonth() && dt.getFullYear() == currentDate.getFullYear()) {
            $(days_item).addClass("flex-item date current");
        }
        mobile_date.innerHTML = d + ", " + month_name[dt.getMonth()] + " " + i;
        desktop_date.innerHTML = i;


        var mm = ("0" + (dt.getMonth() + 1)).slice(-2);
        var dd = ("0" + i).slice(-2);
        var yyyy = dt.getFullYear();
        var new_date = mm + "/" + dd + "/" + yyyy;

        var filteredEvents = new_obj.filter(event => {
            return event.duedate === new_date;
        })
        var todo = [];
        var done = [];
        var backup = [];
        var doing = [];
        if (filteredEvents.length > 0) {
            $(days_item).data("date", new_date);

            todo = filteredEvents.filter(event => {
                return event.list === "todo";
            });

            done = filteredEvents.filter(event => {
                return event.list === "done";
            });

            backup = filteredEvents.filter(event => {
                return event.list === "backup";
            });

            doing = filteredEvents.filter(event => {
                return event.list === "doing";
            });

            if (todo.length > 0) {
                var todoIcon = $('<span class="glyphicon glyphicon-pushpin"></span>')
                $(days_item).append(todoIcon);
            }

            if (done.length > 0) {
                var doneIcon = $('<span class="glyphicon glyphicon-ok"></span>')
                $(days_item).append(doneIcon);
            }

            if (backup.length > 0) {
                var backupIcon = $('<span class="glyphicon glyphicon-floppy-open"></span>')
                $(days_item).append(backupIcon);
            }

            if (doing.length > 0) {
                var doingIcon = $('<span class="glyphicon glyphicon-pencil"></span>')
                $(days_item).append(doingIcon);
            }
        }


        $(days_item).append(mobile_date);
        $(days_item).append(desktop_date);
        var date_Str = month_name[dt.getMonth()] + " " + i + " " + dt.getFullYear();


        $("#calendar-dates").append(days_item);
    }
}