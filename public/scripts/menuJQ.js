$(document).ready(() => {
  $(".add-food").on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    //console.log(data);
    $.ajax({
      url: "/menu/add/11",
      method: "POST",
    });
  });

  $(".minus-food").on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log("here inside the .minus-food button");
    //console.log(data);
    $.ajax({
      url: `/menu/minus/11`,
      method: "DELETE",
    });
  });
});

// $('#new-tweet-form').on('submit', function (event) {
//   event.preventDefault();
//   const data = $(this).serialize();
//   if (!tweetText.value) {
//     $errorMessage.text('You gotta say something!');
//     $errorMessage.slideDown(500);
//     setTimeout(() => {
//       $errorMessage.slideUp(1000);
//     }, 1500);
//   } else if (tweetText.value.length > 140) {
//     $errorMessage.text('Backspace it up.');
//     $errorMessage.slideDown(500);
//     setTimeout(() => {
//       $errorMessage.slideUp(1000);
//     }, 1500);
//   } else
//     $.ajax({
//       method: 'POST',
//       url: '/tweets',
//       data: data,
//       success: tweets => {
//         tweetText.value = '';
//         $('.counter').text(140).css({ color: 'black' });
//         getTweets();
//       },
//     });

// const getTweets = () => {
//   $.ajax({
//     url: '/tweets',
//     method: 'GET',
//     success: tweets => {
//       console.log(tweets);
//       $tweetContainer.empty();
//       for (const tweet of tweets) {
//         const $tweet = createTweet(tweet);
//         $tweetContainer.prepend($tweet);
//       }
//     },
//   });
// };
