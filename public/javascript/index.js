$(document).ready(function () {
  $(".apartments-dropdown").select2();
  $(".bills-dropdown").select2();

  $("#paymentsTable").DataTable({
    responsive: {
      details: false,
    },
  });
});
