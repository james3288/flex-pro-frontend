var owl = $(".owl-carousel");
owl.owlCarousel();

// owl.reinit({
//   touchDrag: true,
//   mouseDrag: true,
// });

// Go to the next item
$(".r-form-btn").click(function () {
  owl.trigger("next.owl.carousel");
});
// Go to the previous item
$(".customPrevBtn").click(function () {
  // With optional speed parameter
  // Parameters has to be in square bracket '[]'
  owl.trigger("prev.owl.carousel", [300]);
});
