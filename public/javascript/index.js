$(document).ready(function () {
  $(".apartments-dropdown").select2();
  $(".bills-dropdown").select2();

  var paymentsTable = $("#paymentsTable").DataTable({
    dom: "lfrtBp",
    buttons: [
      {
        extend: "excelHtml5",
        exportOptions: {
          columns: [0, 1, 2, 3],
        },
        messageTop: function () {
          return $("#total-payment").text();
        },
        footer: true,
      },
      {
        extend: "pdfHtml5",
        exportOptions: {
          columns: [0, 1, 2, 3],
        },
        messageTop: function () {
          return $("#total-payment").text();
        },
        footer: true,
      },
      {
        extend: "print",
        exportOptions: {
          columns: [0, 1, 2, 3],
        },
        messageTop: function () {
          return $("#total-payment").text();
        },
        footer: true,
      },
    ],
    order: [[4, "desc"]],
  });

  try {
    var total = paymentsTable.column(3, { filter: "applied" }).data().sum();
    totalPayment = Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(total);
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

  $("#paymentsTable_filter input").on("keyup", function () {
    var total = paymentsTable.column(3, { search: "applied" }).data().sum();
    totalPayment = Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(total);
    $("#value").html(totalPayment);
  });

  initializeApartmentTable();

  $(".modal--confirm-button").on("click", function (e) {
    const url = $(e.currentTarget).data("href");
    window.location = url;
  });

  $(".modal--cancel-button").on("click", function (e) {
    $(".modal--confirm-button").data("href", "");
    $("#delete-modal-preview").removeClass("show");
  });

  $(".delete").on("click", (e) => {
    const url = $(e.currentTarget).data("href");
    $("#delete-modal-preview").addClass("show");
    $(".modal--confirm-button").data("href", url);
  });
});

function initializeApartmentTable() {
  var apartmentsTable = $("#apartmentsTable").DataTable({
    order: [[0, "asc"]],
  });
}
