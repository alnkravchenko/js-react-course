import $ from "jquery";

$(() => {
  $(".list-item:first")
    .on("mouseenter", () => {
      $(".list-item:first").addClass("active");
    })
    .on("mouseleave", () => {
      $(".list-item:first").removeClass("active");
    });

  $(".list-item:eq(2)").on("click", () => {
    $(".image:even").fadeToggle("slow");
  });

  $(".list-item:eq(4)").on("click", () => {
    $(".image:odd").animate({
      opacity: "toggle",
      height: "toggle"
    }, 2000);
  });
});
