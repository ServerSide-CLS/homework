function EmailClick() {
    let time = 180;
    const email = $('#email').val();
    $.get('/email', {
            email: email
        },
        function (data) {
            console.log(data)
        }
    );
    let intervalClock = setInterval(function () {
        submitBtnClicked();
    }, 1000);
    function submitBtnClicked() {
        time--;
        $('#emialcore').attr("value", "Retry after " + time + "s");
        if (time === 0) {
            clearInterval(intervalClock);
            $('#emialcore').attr("value", "Send Verify Code");
            $('#emialcore').attr("disabled", false);
        } else {
            $('#emialcore').attr("disabled", true);
        }
    }
}