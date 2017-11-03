$(document).ready(function() {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    if ($('.calendar').length > 0) {
        $('.calendar').fullCalendar({
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            buttonText: {
                today: '跳转到当天'
            },
            editable: true,
            events: [{
                title: '软件工程作业V1.0',
                start: new Date(2017, 9, 17),
                end: new Date(2017, 9, 21),
                url: '/shangchuan'
            },
                {
                    title: 'linux作业 vi编辑器',
                    start: new Date(2017, 9, 23),
                    end: new Date(2017, 9, 25),
                    url: '/shangchuan'
                }]
        });
    }
});