$(document).ready(function () {
  $(".apartments-dropdown").select2();
  $(".bills-dropdown").select2();

  var paymentsTable = $("#paymentsTable").DataTable({
    responsive: {
      details: false,
    },
  });
  totalPayment = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(paymentsTable.column(2).data().sum());
  $("#value").append(totalPayment);
});
