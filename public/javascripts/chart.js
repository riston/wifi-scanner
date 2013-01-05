$(document).ready(function() {
	console.log('Ready to add charts');

    $addressInput = $('#address');

    $.ajax({
    	url: '/address/chart/' + $addressInput.val()
      , success: function(data, status, xhr) {
        var r = Raphael('signalChart');

        var options = {
            gutter: 20
            , nostroke: false
            , axis: '0 0 1 1'
            , symbol: 'circle'
            , width: 1.3 // Size for the symbol
            , smooth: true
        };


        r.text(160, 10, 'Signal strength in time, lower is better').attr(
            { font: "1.2em sans-serif" }
        );

        var lines = r.linechart(20, 20, 800, 150,
            data.xAxisDate.slice(0, 50),
            data.yAxisSignal.slice(0, 50), options);

        lines.hoverColumn(function() {
            this.tags = r.set();
            for (var i = 0, ii = this.y.length; i < ii; i++) {
                this.tags.push(r.flag(this.x, this.y[i], this.values[i], 160, 10).insertBefore(this));
            }
        }, function() {
            this.tags.animate({ opacity: 0}, 300, function() {
                this.remove();
            });
        });

        lines.axis[0].text.items.forEach(function(label, index) {
            original = label.attr('text');
            newText = moment(new Date(parseInt(original, 10))).format('HH:mm DD/MM/YYYY');
            label.rotate(30);
            label.attr({ 'text': newText, 'text-anchor': 'start' });
        });
     }
    });
});

var drawChart = function(data) {

};