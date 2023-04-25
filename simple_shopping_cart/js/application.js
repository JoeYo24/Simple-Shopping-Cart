$(document).ready(function () {
    $('tbody tr').each(function (i,ele) {
        console.log($(ele).find('td').first().text());
    });
});

var updateCost = function (ele) {
    var price = parseFloat($(ele).find('.price').text());
    var qty = parseFloat($(ele).find('.qty input').val());

    var cost = round(price * qty, 10);
    $(ele).find('.cost').text(cost);
    return round(cost, 10);
}

var sum = function (a, b) { return a + b };

var updateCartCost = function () {
    var totalCost = [];

    $('tbody tr').each(function (i, ele) {
        var cost = updateCost(ele);
        totalCost.push(cost);
    });

    var cartCost = round(totalCost.reduce(sum), 10);
    $('#totalCart').html(cartCost);
};

$(document).ready(function () {
    updateCartCost();

    $(document).on('click', '.btn.remove', function (event) {
        $(this).closest('tr').remove();
        updateCartCost();
    });

    $(document).on('input', 'tr input', function () {
        updateCartCost();
    });

    $('#addItem').on('submit', function (event) {
        event.preventDefault();
        var name = $(this).children('[name=name]').val();
        var price = parseFloat($(this).children('[name=price]').val());
        var qty = parseFloat($(this).children('[name=qty]').val());
        var cost = price * qty;
        $('tbody').append('<tr>' +
        '<td class="name">' + name + '</td>' +
        '<td class="price">' + price + '</td>' +
        '<td class="qty"><input id="qty" type="number" min="0" value="' + qty + '" /></td>' +
        '<td class="cost">' + cost + '</td>' +
        '<td><button class="btn btn-xs remove">REMOVE</button></td>' +
        '</tr>') 
        updateCartCost();
    })
});

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

var timeout;
$('tr input').on('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        updateCartCost();
    }, 1000);
});
