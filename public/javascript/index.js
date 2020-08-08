$(document).ready(function () {
  $(".apartments-dropdown").select2();
  $(".bills-dropdown").select2();

  var paymentsTable = $("#paymentsTable").DataTable({
    dom: "lfrtBp",
    buttons: ["excel", "pdf", "print"],
    order: [[4, "desc"]],
  });

  try {
    totalPayment = Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(paymentsTable.column(3).data().sum());
    $("#value").append(totalPayment);
  } catch (e) {}

  $("#open-menu").on("click", function (e) {
    // $(".side-bar").toggle("display");
    $(".side-bar").show();
  });
  $("#close-menu").on("click", function (e) {
    // $(".side-bar").toggle("display");
    $(".side-bar").hide();
  });
});
